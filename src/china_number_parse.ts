enum ChinaNumber {
    Zero = '零',
    One = '一',
    Two = '二',
    Three = '三',
    Four = '四',
    Five = '五',
    Six = '六',
    Seven = '七',
    Eight = '八',
    Nine = '九',
    Ten = '十',
    Thousand = '千',
    Hundred = '百',
    Wan = '万'
}

interface ChinaNumberType {
    [index: string]: number;
}

const ChinaNumberMap: ChinaNumberType = {
    [ChinaNumber.Zero]: 0,
    [ChinaNumber.One]: 1,
    [ChinaNumber.Two]: 2,
    [ChinaNumber.Three]: 3,
    [ChinaNumber.Four]: 4,
    [ChinaNumber.Five]: 5,
    [ChinaNumber.Six]: 6,
    [ChinaNumber.Seven]: 7,
    [ChinaNumber.Eight]: 8,
    [ChinaNumber.Nine]: 9,
    [ChinaNumber.Ten]: 10,
    [ChinaNumber.Thousand]: 1000,
    [ChinaNumber.Hundred]: 100,
    [ChinaNumber.Wan]: 10000
};



function find(str: string, code: ChinaNumber[]) {
    const end: { code: ChinaNumber, index: number }[] = [];
    for(const c of code) {
        const index = str.indexOf(c);
        if (index > -1) {
            end.push({
                index,
                code: c
            });
        }
    }
}

function getChinaNumber(str: string): ChinaNumber {
    const num = str as ChinaNumber;
    if(!num) {
        throw new Error('非法字符转换');
    }
    return num;
}

export default function chinaNumberParse(num: string, value: number = 0): number {
    if(num.length === 0) {
        return value;
    }
    if(num.length === 1) {
        return ChinaNumberMap[num] + value;
    }
    
    if(num.length === 2 && num[0] === ChinaNumber.Ten) {
        num = `一${num}`;
    }

    const firstNum = getChinaNumber(num[0]);

    if(firstNum === ChinaNumber.Zero) {
        return chinaNumberParse(num.slice(1), value); 
    }

    const NextNum = getChinaNumber(num[1]);

    if(num.length > 2 && [ ChinaNumber.Hundred, ChinaNumber.Thousand, ChinaNumber.Hundred ].indexOf(NextNum) < 0) {
        throw new Error(`Next Num 格式错误, 原文: ${num}`)
    }

    const resultValue = value + ChinaNumberMap[firstNum] * ChinaNumberMap[NextNum];

    return chinaNumberParse(num.slice(2), resultValue);
}