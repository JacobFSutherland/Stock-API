import got from "got/dist/source";
import parse from "node-html-parser";

export async function getStockPrice(ticker: string): Promise<number> {
    try{
        let res = await got({
            'method': 'GET',
            'url': `https://finance.yahoo.com/quote/${ticker}/`,
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
        //document.querySelectorAll('#quote-header-info')[0].children[2].children[0].children[0].children[0].innerText
        let price = html.querySelectorAll('#quote-header-info')[0].childNodes[2].childNodes[0].childNodes[0].childNodes[0].innerText.replace(/,/g, '')
        console.log(price);
        return Number(price);

    }catch(e){
        console.log(e);
        console.log('Stock Error');
        return 0;
    }
}