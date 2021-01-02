import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x8427b6f40A933A824174D778B227a2baB18f3D39'
);

export default instance;
