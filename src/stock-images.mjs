/**
 * Homepage photographs: free-to-use photos from Unsplash (Unsplash License: free for commercial use,
 * no attribution required; credits kept here anyway). Downloaded, cropped to each slot and exported
 * as WebP at 1× and 2× by `npm run images:stock`. `w`/`h` are the 2× master size.
 */
export const STOCK_IMAGES = [
  { key: 'stock-hero', file: 'hero', photo: 'photo-1737644467636-6b0053476bb2', source: 'https://unsplash.com/photos/a-white-robot-is-standing-in-front-of-a-black-background-CjWsslYVnPI', w: 1600, h: 1333, alt: "White humanoid AI robot in profile with glowing circuitry", flop: true },
  { key: 'stock-wwd-ai', file: 'wwd-ai', photo: 'photo-1737505599159-5ffc1dcbc08f', source: 'https://unsplash.com/photos/a-computer-circuit-board-with-a-brain-on-it-_jg8xh2SsXQ', w: 840, h: 600, alt: "Glowing digital brain on a circuit board representing AI engineering" },
  { key: 'stock-wwd-software', file: 'wwd-software', photo: 'photo-1498050108023-c5249f4df085', source: 'https://unsplash.com/photos/a-macbook-with-lines-of-code-on-its-screen-on-a-busy-desk-m_HRfLhgABo', w: 840, h: 600, alt: "Laptop showing code on a developer desk" },
  { key: 'stock-wwd-mobile', file: 'wwd-mobile', photo: 'photo-1551650975-87deedd944c3', source: 'https://unsplash.com/photos/smartphone-displaying-environmental-data-dashboard-sScmok4Iq1o', w: 840, h: 600, alt: "Hand holding a smartphone displaying an app dashboard" },
  { key: 'stock-wwd-cloud', file: 'wwd-cloud', photo: 'photo-1580106815433-a5b1d1d53d85', source: 'https://unsplash.com/photos/a-long-hallway-with-glass-doors-leading-to-another-room-s0XabTAKvak', w: 840, h: 600, alt: "Corridor of server racks in a data centre" },
  { key: 'stock-ai-chip', file: 'ai-chip', photo: 'photo-1697577418970-95d99b5a55cf', source: 'https://unsplash.com/photos/a-computer-chip-with-the-letter-a-on-top-of-it-eGGFZ5X2LnA', w: 800, h: 1000, alt: "AI processor chip on a circuit board" },
  { key: 'stock-ind-healthcare', file: 'ind-healthcare', photo: 'photo-1666214280391-8ff5bd3c0bf0', source: 'https://unsplash.com/photos/medical-professionals-reviewing-digital-imaging-MFSEP2g4YS0', w: 560, h: 400, alt: "Medical professionals reviewing digital scans on monitors" },
  { key: 'stock-ind-fintech', file: 'ind-fintech', photo: 'photo-1658722358481-f5c37202b845', source: 'https://unsplash.com/photos/a-group-of-skyscrapers-3OB-TC_QfJQ', w: 560, h: 400, alt: "Glass skyscrapers in a financial district" },
  { key: 'stock-ind-retail', file: 'ind-retail', photo: 'photo-1664455340023-214c33a9d0bd', source: 'https://unsplash.com/photos/a-toy-shopping-cart-BQ9usyzHx_w', w: 560, h: 400, alt: "Shopping cart filled with parcels" },
  { key: 'stock-ind-manufacturing', file: 'ind-manufacturing', photo: 'photo-1647427060118-4911c9821b82', source: 'https://unsplash.com/photos/a-factory-filled-with-lots-of-orange-machines-8gr6bObQLOI', w: 560, h: 400, alt: "Robotic arms on a factory production line" },
  { key: 'stock-ind-education', file: 'ind-education', photo: 'photo-1758876201935-0d85989a52e2', source: 'https://unsplash.com/photos/woman-working-at-a-desk-with-laptop-and-notebook-QSw9ziS-5j0', w: 560, h: 400, alt: "Student studying at a desk with a laptop" },
  { key: 'stock-ind-logistics', file: 'ind-logistics', photo: 'photo-1678182451047-196f22a4143e', source: 'https://unsplash.com/photos/a-large-amount-of-containers-are-stacked-on-top-of-each-other-Annl9CjEaEs', w: 560, h: 400, alt: "Aerial view of a container port with cranes" },
  { key: 'stock-ind-real-estate', file: 'ind-real-estate', photo: 'photo-1515263487990-61b07816b324', source: 'https://unsplash.com/photos/black-and-white-cocnrete-building-low-angle-photography-koH7IVuwRLw', w: 560, h: 400, alt: "Modern residential building" },
  { key: 'stock-ind-travel', file: 'ind-travel', photo: 'photo-1771302545576-342c95ba5b76', source: 'https://unsplash.com/photos/a-commercial-airplane-flying-in-a-clear-blue-sky-HoDnLNJaufw', w: 560, h: 400, alt: "Passenger airplane flying in a blue sky" },
  { key: 'stock-res-1', file: 'res-1', photo: 'photo-1644325349124-d1756b79dd42', source: 'https://unsplash.com/photos/a-blue-abstract-background-with-lines-and-dots-pREq0ns_p_E', w: 900, h: 360, alt: "" },
  { key: 'stock-res-2', file: 'res-2', photo: 'photo-1542831371-29b0f74f9713', source: 'https://unsplash.com/photos/lines-of-html-codes-4hbJ-eymZ1o', w: 900, h: 360, alt: "" },
  { key: 'stock-res-3', file: 'res-3', photo: 'photo-1718241905462-56e7b9f722f3', source: 'https://unsplash.com/photos/a-close-up-of-a-keyboard-with-a-blue-button-DEci5GH0r0k', w: 900, h: 360, alt: "" },
  { key: 'stock-res-4', file: 'res-4', photo: 'photo-1683322499436-f4383dd59f5a', source: 'https://unsplash.com/photos/a-bunch-of-blue-wires-connected-to-each-other-PSpf_XgOM5w', w: 900, h: 360, alt: "" },
  { key: 'stock-cta', file: 'cta', photo: 'photo-1688828792704-4218151b5d97', source: 'https://unsplash.com/photos/a-man-sitting-on-a-couch-using-a-laptop-computer-9Y5kAd6TdVs', w: 1200, h: 800, alt: "Professional working on a laptop in a modern office" },
];
