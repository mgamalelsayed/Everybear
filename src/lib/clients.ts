/**
 * Client logos shown on the home page. Order is curated, not alphabetical —
 * load-bearing names first so the wall reads strong on first scroll.
 *
 * `ext` defaults to "png" (designer ships rasters). Override per brand if a
 * vector is available.
 */
export type ClientLogo = {
  slug: string;
  name: string;
  ext?: 'svg' | 'png';
};

export const CLIENTS: ClientLogo[] = [
  { slug: 'huawei', name: 'Huawei' },
  { slug: 'samsung', name: 'Samsung' },
  { slug: 'vodafone', name: 'Vodafone' },
  { slug: 'coca-cola', name: 'Coca-Cola' },
  { slug: 'microsoft', name: 'Microsoft' },
  { slug: 'hsbc', name: 'HSBC' },
  { slug: 'americana', name: 'Americana' },
  { slug: 'philips', name: 'Philips' },
  { slug: 'nissan', name: 'Nissan' },
  { slug: 'danone', name: 'Danone' },
  { slug: 'total-energies', name: 'TotalEnergies' },
  { slug: 'costa-coffee', name: 'Costa Coffee' },
  { slug: 'banque-misr', name: 'Banque Misr' },
  { slug: 'hardees', name: "Hardee's" },
  { slug: 'kfc', name: 'KFC' },
  { slug: 'zanussi', name: 'Zanussi' },
  { slug: 'unionaire', name: 'Unionaire' },
  { slug: 'etisalat', name: 'Etisalat' },
  { slug: 'eni', name: 'ENI' },
  { slug: 'sodic', name: 'Sodic' },
  { slug: 'marina-home', name: 'Marina Home' },
  { slug: 'naeem-holding', name: 'Naeem Holding' },
  { slug: 'apex-pharma', name: 'APEX Pharma' },
  { slug: 'bionime', name: 'Bionime' },
  { slug: '22-avenue', name: '22 Avenue' },
  { slug: 'gsk', name: 'GSK' },
  { slug: 'gaviscon', name: 'Gaviscon' },
  { slug: 'gastec', name: 'GasTec' },
  { slug: 'gmhc', name: 'GMHC' },
  { slug: 'giz', name: 'GIZ' },
  { slug: 'california', name: 'California Garden' },
  { slug: 'farm-frites', name: 'Farm Frites' },
  { slug: 'seara', name: 'Seara' },
  { slug: 'orascom', name: 'Orascom' },
  { slug: 'palma', name: 'Palma' },
  { slug: 'i-capp', name: 'I-CAPP' },
  { slug: 'tez', name: 'TEZ' },
  { slug: 'computer-shop', name: 'Computer Shop' },
];
