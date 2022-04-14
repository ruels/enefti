import {useState, useEffect} from 'react';
import { CopyToClipboard } from "react-copy-to-clipboard";
import {BiCopyAlt} from 'react-icons/bi'

const Deposit = () => {
  const [barcode, setBarcode] = useState("3FXKbTieemhEtv25Q9mSiAxP7HaRc3H4QM");
  const [amt, setAmt] = useState(0);
  const [btc, setBtc] = useState(0.0);
  const [currentprice, setCurrentPrice] = useState(0.0);
  const handleChange = (e) => {
    setAmt(e.target.value);
    const value = parseInt(e.target.value) * setBtc();
  };
  const handleBtc = (e) => {
    const value = amt / currentprice;
    setBtc(value.toFixed(6));
  };

  useEffect(() => {
    const value = amt / currentprice;
    console.log(`${amt} ${currentprice}`)
    setBtc(value.toFixed(6));
  }, [amt])
  
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json", {
      signal: signal,
    })
      .then((response) => response.json())
      .then((res) => {
        let price = res.bpi.USD.rate;
        price = parseFloat(price.replace(",", ""));

        setCurrentPrice(price);
      });

    return () => controller.abort();
  }, []);

  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  // const onDeposit = () => {
  //   fetch("/deposit", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, deposit: amt }),
  //   });
  //   notify();
  // };
  return (
    <div className="lg:px-16  w-full pt-0 lg:w-1/2 lg:ml-16 px-4 text-white">
      <div className="mb-10 flex justify-between">
        <h1 className="text-2xl font-bold pb-3 text-gray-200">Deposit</h1>
        <div>
        <p className="text-sm font-bold">Your balance</p>
        <p className="font-semibold"><span className="text-secondary">$</span>{`112000`}</p></div>

      </div>

      <section className="flex lg:flex-row flex-col justify-between gap-x-10">
        <div className="lg:w-10/12 flex flex-col items-center">
          <h2 className="text-lg font-semibold pb-3 w-full">Fund your wallet</h2>
          <ul class="menu p-2 rounded-box text-white w-full bg-primary text-xs">
  <li>
    <a class="bg-gray-700 py-1.5">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white " fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    Enter desired amount
    </a>
  </li>
  <li>
    <a className="py-1.5">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      Copy wallet address
    </a>
  </li>
  <li>
    <a class="bg-gray-700 py-1.5">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
      Make deposit, and click "I have made payment"
    </a>
  </li>
</ul>
          <div className="w-full flex justify-center">
          <div class="form-control mt-2">
              <label class="label">
                <span class="label-text">Enter amount</span>
              </label>
              <label class="input-group input-group-xs mt-1 text-white">
                <span className="bg-gray-700 font-bold text-sm">Price</span>
                <input type="text"  onChange={handleChange} placeholder="0" class="input h-8 input-group-xs input-bordered text-primary"/>
                <span className="bg-gray-700 font-bold text-sm">USD</span>
              </label>
            </div>
          </div>


            <div className="w-full">

           <div className="flex mt-6 w-full items-center h-12">
              <div className="w-10/12">
              <div className="text-sm lg:text-lg">
                  BTC equivalent: {btc ? btc : 0}{" "}
                  <span className="text-yellow-500 text-xs font-bold">BTC</span>
                </div>
                <input
                  className="flex text-center text-gray-300 w-full px-2"
                  value='3FXKbTeem...Rc3H4QM'
                />
              </div>
                <CopyToClipboard text={barcode} onCopy={onCopy}><BiCopyAlt className="mt-6 ml-4 text-yellow-500 bg-pr" size={25}/></CopyToClipboard>
              </div>
            {/* <CopyToClipboard text={barcode} onCopy={onCopy}>
              <button className="btn btn-block bg-secondary text-gray-100 font-bold font-mono uppercase mt-2 px-4 mb-2">
                Copy
              </button>
            </CopyToClipboard> */}
            </div>
        </div>

        

      </section>

      <div className="lg:w-10/12"> <button class="btn btn-primary btn-square mx-0 text-white flex btn-block bg-secondary mt-6">I have made payment</button></div>

     
    </div>
  );
};

export default Deposit;