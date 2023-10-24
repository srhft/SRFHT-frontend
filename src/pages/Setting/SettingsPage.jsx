import React, { useState } from 'react'
import styled from "styled-components"
import TopSection from "./components/TopSection"
import SettingsNav from './components/SettingsNav';
import Profile from "./layouts/Profile"
import PersonIcon from '@mui/icons-material/Person';
import UserConfiguration from './layouts/UserConfiguration';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import BackupIcon from '@mui/icons-material/Backup';
import UploadSatelments from './layouts/UploadSatelments';
import CloudIcon from '@mui/icons-material/Cloud';
import Backup from './layouts/Backup';
import CloudSyncIcon from '@mui/icons-material/CloudSync';
import Trades from './layouts/Trades';
import HttpsIcon from '@mui/icons-material/Https';
import ChangePassword from './layouts/ChangePassword';




const Container = styled.div`
    min-height: calc(100dvh - 70px);
    padding: 0.5rem;

`

const MainContent = styled.div`
    display: flex;
    gap: 1rem;
    @media screen and (max-width: 700px){
        flex-direction: column;
    }
`
const Main = styled.div`
    flex: 8;
`

var NavItems = [
    {permission: 1, icon: <PersonIcon/>, element: <Profile/>, name: "Profile", key: "profile", },
    {permission: 1, icon: <PersonSearchOutlinedIcon/>, element: <UserConfiguration/>, name: "User Configuration", key: "userConfig",  active: true},
    {permission: 2, icon: <BackupIcon/>, element: <UploadSatelments/>, name: "Upload Statment", key: "uploadStatment"},
    {permission: 3, icon: <CloudIcon/>, element: <Backup/>, name: "Backup", key: "backup"},
    {permission: 1, icon: <CloudSyncIcon/>, element: <Trades/>, name: "Trades", key: "trades"},
    {permission: 1, icon: <HttpsIcon/>, element: <ChangePassword/>, name: "Change Password", key: "changePass"},
]

function SettingsPage() {
    const [navitems, setNavItems] = useState(NavItems)
    const activNav = navitems.find(e => e.active)
	return (
		<Container>
            <TopSection/>
            <MainContent>
                <SettingsNav items={navitems} set={setNavItems}/>
                <Main>
                    {activNav.element}
                </Main>
            </MainContent>
		</Container>
	)
}

export default SettingsPage