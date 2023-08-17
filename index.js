const URL = require('url').URL;
const axios = require('axios');

let callId = 0;
const targetUrl = "https://www.google.com";

const start = async () => {
  setInterval(() => {
    callId += 1;
    call(callId);
  }, 1000);
};

const call = async (mCallId) => {
  try {
    let startTime = (new Date()).getTime();
    let url = process.env.URL || targetUrl;
    let urlObj = new URL(url);
    urlObj.searchParams.append('id', mCallId);
    console.log(`${(new Date())} #call (${mCallId}) :: url >> ${urlObj.toString()}`);
    let resp = await axios({
      method: 'get',
      url: urlObj.toString(),
    });
    // console.log(resp.data);
    let endTime = (new Date()).getTime();
    if ((endTime - startTime) >= 2000) {
      console.log(`${(new Date())} :: #call (${mCallId}) :: Response Delay >> ${endTime - startTime} ms`);
    }
  } catch (err) {
    console.error(err);
  }
};

start();
