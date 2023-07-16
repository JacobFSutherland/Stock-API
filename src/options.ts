import got from "got/dist/source";
import parse from "node-html-parser";
import { OptionMap } from "./OptionMap";
import { OptionTable, OptionStat } from "./types/OptionTypes";

export async function getOptions(ticker: string): Promise<OptionMap> {
    try{
        let res = await got({
            'method': 'GET',
            'url': `https://finance.yahoo.com/quote/${ticker}/options`,
            'headers': {
              'pragma': 'no-cache',
              'cache-control': 'no-cache',
              'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
              'dnt': '1',
              'sec-ch-ua-mobile': '?0',
              'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
              'sec-ch-ua-platform': '"Windows"',
              'accept': '*/*',
              'sec-fetch-site': 'same-origin',
              'sec-fetch-mode': 'cors',
              'sec-fetch-dest': 'empty',
              'accept-language': 'en-US,en;q=0.9,ja-JP;q=0.8,ja;q=0.7,zh-TW;q=0.6,zh;q=0.5',
            }
        });
        let html = parse(res.body);
        let price = html.querySelectorAll('#quote-header-info')[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].innerText.replace(/,/g, '');
        let optionMap: OptionMap = new OptionMap(Number(price));
        //document.querySelectorAll('#quote-header-info')[0].children[2].children[0].children[0].children[0].innerText
        console.log('Scraping Calls and Puts');
        console.log(html.querySelectorAll('tbody').length);
        let calls = html.querySelectorAll('tbody')[0].childNodes;
        let puts = html.querySelectorAll('tbody')[1].childNodes;
        console.log('Scraped Calls and Puts');
        let callTable: OptionTable = {};
        let putTable: OptionTable = {}
        console.log('Inserting Calls into Table');
        calls.forEach(option => {
            let optionStat: OptionStat = {
                bid: Number(option.childNodes[4].innerText.replace(/,/g, '')),
                ask: Number(option.childNodes[5].innerText.replace(/,/g, ''))
            }
            callTable[Number(option.childNodes[2].innerText.replace(/,/g, ''))] = optionStat;
        });
        console.log('Inserting Puts into Table');
        puts.forEach(option => {
            let optionStat: OptionStat = {
                bid: Number(option.childNodes[4].innerText.replace(/,/g, '')),
                ask: Number(option.childNodes[5].innerText.replace(/,/g, ''))
            }
            putTable[Number(option.childNodes[2].innerText.replace(/,/g, ''))] = optionStat;
        });
        optionMap.Calls = callTable;
        optionMap.Puts = putTable;
        return optionMap;
    }catch(e){
        console.log(e);
        console.log('Option Error');
        return new OptionMap(0);
    }
}