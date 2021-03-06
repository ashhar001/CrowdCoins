import Web3 from 'web3';

let web3;

//if will handle the code being executed inside the browser and metamask is availabe
//type of is used to see if a variabe is defined
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {  
  // We are in the browser and metamask is running.
  web3 = new Web3(window.web3.currentProvider);
} else {
  // We are on the server *OR* the user is not running metamask
  const provider = new Web3.providers.HttpProvider(
    'https://rinkeby.infura.io/v3/f2bcf7566f54469b8bbd1388820ac05f'
  );
  web3 = new Web3(provider);
}

export default web3;
