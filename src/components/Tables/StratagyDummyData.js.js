export const OrdersData = [
    {
        time: "10:02:00",
        symbol: "BANKNFTY220CT21000E",
        orderNo: "1",
        strategy: "Audi B1",
        qty: 50,
        price: 90,
        action: 2,
        id: 1
    },
    {
        time: "10:05:30",
        symbol: "TATAMOTORS220PE220",
        orderNo: "2",
        strategy: "Audi B1",
        qty: 100,
        price: 70,
        action: 1,
        id: 2
    },
    {
        time: "10:07:45",
        symbol: "HDFC220CE2300",
        orderNo: "3",
        strategy: "Audi B1",
        qty: 75,
        price: 120,
        action: 1,
        id: 3
    },
    {
        time: "10:10:15",
        symbol: "ICICIBANK220PE600",
        orderNo: "4",
        strategy: "Audi B1",
        qty: 200,
        price: 50,
        action: 2,
        id: 4
    },
    {
        time: "10:15:20",
        symbol: "RELIANCE220CE2100",
        orderNo: "5",
        strategy: "Audi B1",
        qty: 150,
        price: 100,
        action: 1,
        id: 5
    },
    {
        time: "10:20:10",
        symbol: "INFY220PE1200",
        orderNo: "6",
        strategy: "Audi B1",
        qty: 80,
        price: 40,
        action: 1,
        id: 6
    },
    {
        time: "10:25:15",
        symbol: "NIFTY220CE17000",
        orderNo: "7",
        strategy: "Audi B1",
        qty: 100,
        price: 150,
        action: 2,
        id: 7
    },
    {
        time: "10:30:25",
        symbol: "HDFC220PE2300",
        orderNo: "8",
        strategy: "Audi B1",
        qty: 50,
        price: 100,
        action: 1,
        id: 8
    },
    {
        time: "10:35:30",
        symbol: "ONGC220CE140",
        orderNo: "9",
        strategy: "Audi B1",
        qty: 150,
        price: 20,
        action: 2,
        id: 9
    },
    {
        time: "10:40:40",
        symbol: "WIPRO220PE500",
        orderNo: "10",
        strategy: "Audi B1",
        qty: 120,
        price: 60,
        action: 1,
        id: 10
    },
    {
        time: "10:45:50",
        symbol: "ONGC220PE120",
        orderNo: "11",
        strategy: "Audi B1",
        qty: 90,
        price: 15,
        action: 1,
        id: 11
    },
    {
        time: "10:50:55",
        symbol: "HDFCBANK220CE1400",
        orderNo: "12",
        strategy: "Audi B1",
        qty: 200,
        price: 80,
        action: 1,
        id: 12
    },
    {
        time: "10:55:00",
        symbol: "RELIANCE220PE2000",
        orderNo: "13",
        strategy: "Audi B1",
        qty: 150,
        price: 80,
        action: 2,
        id: 13
    },
    {
        time: "11:00:10",
        symbol: "INFY220CE1400",
        orderNo: "14",
        strategy: "Audi B1",
        qty: 100,
        price: 120,
        action: 2,
        id: 14
    },
    {
        time: "11:05:15",
        symbol: "NIFTY220PE16000",
        orderNo: "15",
        strategy: "Audi B1",
        qty: 120,
        price: 90,
        action: 1,
        id: 15
    }

];





export const NetData = [
    {
        symbol: "BANKNFTY220CT21000E",
        ltp: 0.05,
        qty: 0,
        strategy: "Audi B1",
        buy: 80,
        sell: 120,
        id: 1
    },
    {
        symbol: "BANKNFTY220CT21001E",
        ltp: 0.06,
        qty: 2,
        strategy: "Audi B1",
        buy: 70,
        sell: 110,
        id: 2
    },
    {
        symbol: "BANKNFTY220CT21002E",
        ltp: 0.07,
        qty: 1,
        strategy: "Audi B1",
        buy: 90,
        sell: 130,
        id: 3
    },
    {
        symbol: "BANKNFTY220CT21003E",
        ltp: 0.08,
        qty: 4,
        strategy: "Audi B1",
        buy: 100,
        sell: 140,
        id: 4
    },
    {
        symbol: "BANKNFTY220CT21004E",
        ltp: 0.09,
        qty: 3,
        strategy: "Audi B1",
        buy: 110,
        sell: 150,
        id: 5
    },
    {
        symbol: "BANKNFTY220CT21005E",
        ltp: 0.04,
        qty: 0,
        strategy: "Audi B1",
        buy: 75,
        sell: 115,
        id: 6
    },
    {
        symbol: "BANKNFTY220CT21006E",
        ltp: 0.065,
        qty: 2,
        strategy: "Audi B1",
        buy: 85,
        sell: 125,
        id: 7
    },
    {
        symbol: "BANKNFTY220CT21007E",
        ltp: 0.055,
        qty: 1,
        strategy: "Audi B8",
        buy: 95,
        sell: 135,
        id: 8
    },
    {
        symbol: "BANKNFTY220CT21008E",
        ltp: 0.075,
        qty: 3,
        strategy: "Audi B1",
        buy: 105,
        sell: 145,
        id: 9
    },
    {
        symbol: "BANKNFTY220CT21009E",
        ltp: 0.085,
        qty: 5,
        strategy: "Audi B1",
        buy: 115,
        sell: 155,
        id: 10
    }
];

export const NetDataHead = [
    {
      id: 'symbol',
      numeric: false,
      disablePadding: true,
      label: 'symbol',
    },
    {
      id: 'ltp',
      numeric: true,
      disablePadding: false,
      label: 'ltp',
    },
    {
      id: 'mtm',
      numeric: true,
      disablePadding: false,
      label: 'mtm',
    },
    {
      id: 'qty',
      numeric: true,
      disablePadding: false,
      label: 'qty',
    },
    {
      id: 'strategy',
      numeric: true,
      disablePadding: false,
      label: 'strategy',
    },
    {
      id: 'buy',
      numeric: true,
      disablePadding: false,
      label: 'buy',
    },
    {
      id: 'sell',
      numeric: true,
      disablePadding: false,
      label: 'sell',
    },
  ];

  export const  OrdersTableHead = [
    {
      id: 'time',
      numeric: false,
      disablePadding: true,
      label: 'Time',
    },
    {
      id: 'symbol',
      numeric: true,
      disablePadding: false,
      label: 'Symbol',
    },
    {
      id: 'orderNo',
      numeric: true,
      disablePadding: false,
      label: 'Order no',
    },
    {
      id: 'strategy',
      numeric: true,
      disablePadding: false,
      label: 'Strategy',
    },
    {
      id: 'qty',
      numeric: true,
      disablePadding: false,
      label: 'Qty',
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Price',
    },
  ];

