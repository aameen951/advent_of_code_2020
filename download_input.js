import https from 'https';
import fs from 'fs';
import path from 'path';
import url from 'url';

const YEAR = 2020;
const MONTH = 12; // December
const TIME = 5; // 5:00 UTC

const ROOT_PATH = path.dirname(url.fileURLToPath(import.meta.url));
const DATA_PATH = path.join(ROOT_PATH, "data");

const session_file_path = path.join(ROOT_PATH, ".session");
if(!fs.existsSync(session_file_path))
{
  console.error("Error: File '.session' wasn't found.")
  console.error("       Please extract your session key from cookies and put it in '.session' file in the same directory as this script.");
  process.exit(1);
}

let SESSION_KEY = fs.readFileSync(session_file_path, {encoding:'utf8'}).trim();

async function main(){
  const dir = fs.readdirSync(DATA_PATH);
  const downloaded_days = new Set(dir.map(f => f.match(/^day(\d+)\.txt$/)).filter(m => m).map(m => +m[1]));

  let start = new Date(Date.UTC(YEAR, MONTH - 1, 1, TIME, 0, 0, 0));
  for(let i=1; i<=25; i++)
  {
    const i_date = new Date(start);
    i_date.setUTCDate(i);
    const day_is_available = i_date <= new Date();
    if(day_is_available && !downloaded_days.has(i))
    {
      const request_res = await download_day_input(i);
      if(request_res.status == 200)
      {
        console.log(`Day ${i} input downloaded successfully!`);
        fs.writeFileSync(path.join(DATA_PATH, `day${i}.txt`), request_res.data, {encoding:'utf8'});
      }
      else
      {
        console.log(`Downloading input for day ${i} failed (status: ${request_res.status}).`);
      }
    }
  }
}

main();


async function download_day_input(day)
{
  return await new Promise((resolve, reject) => {
    https.get(`https://adventofcode.com/${YEAR}/day/${day}/input`, {
      headers:{
        "Cookie": `session=${SESSION_KEY}`,
        "Cache-Control": `no-cache`,
      },
    }, (res) => {
      // console.log('statusCode:', res.statusCode);
      // console.log('headers:', res.headers);
      const file_data = [];
      res.setEncoding("utf8");
      res.on('data', (d) => {
        file_data.push(d);
      });
      res.on('end', () => {
        resolve({status:res.statusCode, data:file_data.join()});
      });
    }).on('error', (e) => {
      reject(e);
    }).on('close', () => {
    });
  });
}
