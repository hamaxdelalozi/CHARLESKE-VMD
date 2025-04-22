const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0tuOVdzL0FWa1BuclViVk1EeE8zU1hqQldpSjYxV09pWjNQMmY2Y1RtND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSHBSUXFTa0F6dlplYUdHeCsvbk1mekdFbEJ0dGs3Y3ViaW03eHQrVjVEOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3RmFoY1Rma3czbjB3U29OWmc1dTF6ZHp6VVhnbHVYVExGS1dzeTB0eFcwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKMDhucVBiRUNwMk5JS2JNUEZ2VmRoSXZGbkNBKzhiVFNKSkdxREs3eTFNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJQWStOaUYvZi9pTmJCbjBsYVFPZmd3MWFna1hhQkJFYVAxUnFValNrVW89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpYODgrb3Z5NjNFcHNocGh5VTJvMitYVHNqOFVUek41R1huZ2RyWWxLU0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0xRakN1c0tUUHowYmxJNTZrYjNtMlh2d29kUWJmMk41OWtvbEg3cGdrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVDZEWUt5WXlLZnM5MElMMUZ1d1BtSmQxMzFTZUtJdmtoUkZ4elc3RWtpST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5LUHF5Z3VNZnFwOUNRZC9Pekd1Y2d3bDJDeWZCZzEyNktIRWNLS0pQeCtNcEl2NTdHRThRWHB0ZWNpc1VucUZnS1VYZFpuOTJaenovSUdDd04wSmlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTMsImFkdlNlY3JldEtleSI6InFFdHNiakpaQmxia2ZSNE51UnVoQ2toOVE1TGtKZzVqbndWcEZzck03eDQ9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzM1OTIxODc5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkMxMDZFMURDMUU0MjM3NTAxRUIzMkQxNTE4NzkyMDU2In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDUzNTIxNDN9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NDczNTkyMTg3OUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJERDU4N0IwQjAyRjc1MDUwOUI1RjJEQzUwOTlGNDlDNiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1MzUyMTQzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MzU5MjE4NzlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiODA2QjREMzhDOUUzQTY0ODU0NjEwMjE3MTMyMTEyRUUifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTM1MjE1NH1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiYjFXZHJBcHFUcDJLbUo2MjBsVDdJUSIsInBob25lSWQiOiIxMDJiOTkzZi0yZTgzLTQ0YjMtODE2MC00NWY3ZjQ4N2YxNzQiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOVl3WVh2R3J1Z3l5akNUdGptV2hndzF1dStzPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZ0endpSTNXeFQxOTFBQWhKSWhBbnVSK05aTT0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJENzZKM0NYTiIsIm1lIjp7ImlkIjoiMjU0NzM1OTIxODc5OjhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi4aWrVGhlLkRlc3Ryb3llcvCfkqLwn6uG4pig77iP8J+MrO+4j+KalO+4j+Kdl+Kdl/Cfm5Hwn5Obwq7vuI/imb7vuI8ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lMbmdaZ0NFTC9ybjhBR0dBWWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IndONGhyZG1KMGlvSlJ4aXpsQm5mK2Vhb3VOcU1ueWtERzErSDNoRjFUUWc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjBRbmI2eWVqNTgwNHF2T044VUdzcXFCd3BDcWlXSzkxcW5kSFJpOHhaWUh4clE5WDJ2Yi9QcnRWZzk5YUg3TXhIRG9kTWxpZUdpUE1iTDNWS25teUJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiIzN00vMjJ6N1JZVGgwNDhMQ3E3bCtjekZMaXNRSXdpbG9oSUxsWnNDNWVwTWRYV01rRlI4a0l3bXVrcnhFMFNmWEFBeEZha3dpTnRHRWhSdEFLZXZoZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDczNTkyMTg3OTo4QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmNEZUlhM1ppZElxQ1VjWXM1UVozL25tcUxqYWpKOHBBeHRmaDk0UmRVMEkifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDUzNTIxNDEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBS0RjIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "AndalaTheMr",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254793753327",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

