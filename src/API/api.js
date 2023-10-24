import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

//const HTTP_ROUTE = '127.0.0.1'
const HTTP_ROUTE = "110.227.215.241"
const API_PORT = '8000'

export const url = `http://${HTTP_ROUTE}:${API_PORT}`
export const ws = `ws://${HTTP_ROUTE}:${API_PORT}`

export const createAPI = axios.create({ baseURL: url,  cancelToken: axios.CancelToken.source().token })
export const mediaURL = url + '/media/'

let routes=JSON.parse(localStorage.getItem('routes'))?.data?.result
const updateRoutes = () => routes = JSON.parse(localStorage.getItem('routes'))?.data?.result

// ------------------------------------START-------------------------------------------------
// **********************************authentication******************************************

export const Login_User_API = async (data) => {
    const response = await createAPI.post('/authentication/login', data,{
        headers:{
            'Content-Type':'application/json'
        }
    });
    localStorage.setItem('routes',JSON.stringify(response))
    updateRoutes()
    return response
}
export const Register_User_API = async (data) => {
    const response = await createAPI.post('/settings/createUser', {data: data, event: "create"});
    return response
}
export const checkSession_API = async () => {
    const response = await createAPI.get('/authentication/checkSession', {params:{"event":"checkSession"}});
    return response
}
export const Logout_USER__API = async () => {
    const response = await createAPI.get('/authentication/logout', {params:{"event":"logout"}});
    return response
}
export const DeleteSession_API = async (data) => {
    console.log("del session msg",data);
    const response = await createAPI.post('/authentication/delSession', {"event":"delSession","source":"web","data":data});
    return response
}
export const UpdateProfile_api = async (data) => {
    const response = await createAPI.post(routes.updateUser.endPoint, {"event":routes.updateUser.event,'data':data})
    return response
}


// **********************************Strategy******************************************
export const StrategySave_api = async (data) => {
    const response = await createAPI.post(routes.saveStrategy.endPoint, {"event":routes.saveStrategy.event,'data':data})
    return response
}
export const StrategyUpdate_api = async (data) => {
    const response = await createAPI.post(routes.upadateStrategy.endPoint, {"event":routes.upadateStrategy.event,'data':data});
    return response
}

export const StrategyDelete_api = async (data) => {
    const response = await createAPI.post(routes.deleteStrategy.endPoint, {"event":routes.deleteStrategy.event,'data':data});
    return response
}

export const StrategyStart_api = async (data) => {
    const response = await createAPI.post(routes.startStrategy.endPoint, {"event":routes.startStrategy.event,'data':data});
    return response
}

export const StrategyStop_api = async (data) => {
    const response = await createAPI.post(routes.stopStrategy.endPoint, {"event":routes.stopStrategy.event,'data':data});
    return response
}

export const StrategyFetch_api = async (data) => {
    const response = await createAPI.get(routes.getStrategy.endPoint, {"event":routes.getStrategy.event});
    return response 
}
export const getStrategyWithMTM_api = async () => {
    const response = await createAPI.get(routes.getStrategyWiseMTM.endPoint, {params:{"event":routes.getStrategyWiseMTM.event}});
    return response
}


export const ListAllStrategyFetch_api = async (data) => {
    const response = await createAPI.get(routes.getListAllStrategy.endPoint, {"event":routes.getListAllStrategy.event});
    return response 
}
export const ApplyExistingStrategy_api = async (data) => {
    const response = await createAPI.post(routes.ApplyExistingStrategy.endPoint, {params:{"event":routes.ApplyExistingStrategy.event,'data':data}});
    return response
}



// **********************************Markettt******************************************

export const marketWatchData_api = async (symbol) => {
    const response = await createAPI.get('/dashboard/searchToken', {params:symbol });
    return response
}

export const MarketWatchFetch_api = async (data) => {
    const response = await createAPI.get(routes.getMarketWatch.endPoint, {"event":routes.getMarketWatch.event});
    return response   
}

export const marketWatchSave_api = async (data) => {
    const response = await createAPI.post(routes.marketWatchSave.endPoint, {"event":routes.marketWatchSave.event,'data':data});
    return response
}

export const marketWatchDelete_api = async (data) => {
    const response = await createAPI.post(routes.marketWatchDelete.endPoint,{"event":routes.marketWatchDelete.event,'data':data});
    return response
}

// **********************************SpreadBook******************************************
export const SpreadbookFetch_api = async (data) => {
    const response = await createAPI.get(routes.getSpreadBook.endPoint, {"event":routes.getSpreadBook.event});
    return response   
}

// **********************************Order logs******************************************
export const OrderLogsFetch_api = async (data) => {
    const response = await createAPI.get(routes.getOrderLogs.endPoint, {"event":routes.getOrderLogs.event});
    return response 
}

export const OrderErrorLogsFetch_api = async (data) => {
    const response = await createAPI.get(routes.getOrderErrorLogs.endPoint, {"event":routes.getOrderErrorLogs.event});
    // const response = await createAPI.post('/trade/manualTrade', {"event":'create','data':data});
    return response
}

// **********************************Manual trade******************************************
export const ManualTradeFetch_api = async (data) => {
    const response = await createAPI.get(routes.getManualTrade.endPoint, {"event":routes.getManualTrade.event});
    // console.log('ManualTradeFetch_api-------------------------------------',response);
    // const response = await createAPI.post('/trade/manualTrade', {"event":'create','data':data});
    return response   
}
export const ManualTradeCancel_api = async (data) => {
    const response = await createAPI.post(routes.data.result.manualTradeCancel.endPoint, {"event":routes.data.result.manualTradeCancel.event,'data':data});
    // console.log('ManualTradeCancel_api',response);
    // const response = await createAPI.post('/trade/manualTrade', {"event":'create','data':data});
    return response
}

export const manualTradeCreate_api = async (data) => {
    // const response = await createAPI.post(routes.data.result.manualTradeCreate.endPoint, {"event":routes.data.result.manualTradeCreate.event,'data':data});
    const response = await createAPI.post('/trade/manualTrade', {"event":'create','data':data});
    // console.log('manualTradeCreate_api',response);
    return response
}

export const ManualTradeModify_api = async (data) => {
    const response = await createAPI.post(routes.manualTradeModifiy.endPoint, {"event":routes.manualTradeModifiy.event,'data':data});
    // console.log('ManualTradeModify_api',response);
    // const response = await createAPI.post('/trade/manualTrade', {"event":'create','data':data});
    return response   
}

// **********************************Trade Book*****************************************
export const TradeBookFetch_api = async (data) => {
    const response = await createAPI.get(routes.getTradeBook.endPoint, {"event":routes.getTradeBook.event});
    // console.log('TradeBookFetch_api++++++++++++++++++++++++++++++++++++++++',response);
    // const response = await createAPI.post('/trade/manualTrade', {"event":'create','data':data});
    return response   
}
// **********************************Net Position*****************************************
export const NetpositionFetch_api = async (data) => {
    const response = await createAPI.get(routes.getNetPosition.endPoint, {params:{"event":routes.getNetPosition.event,"data":data}});

    return response   
}

export const getStrategyWiseMTM_api = async (data) => {
    const response = await createAPI.get(routes.getStrategyWiseMTM.endPoint, {params:{"event":routes.getStrategyWiseMTM.event,"data":data}});

    return response   
}


// **********************************Trade Download******************************************
export const TradebookDownload_api = async (date) => {
    console.log('download',date);
    const response = await createAPI.post(routes.downloadTradeBook.endPoint, {"event":routes.downloadTradeBook.event,'data':date});
    // console.log('TradebookDownload_api-------------------------------------',response);
    return response   
}



