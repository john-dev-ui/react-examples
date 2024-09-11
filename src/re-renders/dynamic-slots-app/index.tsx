import React from 'react'
import styled from 'styled-components';

import { AppSlotsProvider, useSlotsContext, Slot, SlotFiller } from './SlotsContext'
import { render } from 'react-dom';
import SimpleApp from './SimpleApp';


const Layout = styled.div`
    display: flex;
    flex-direction: row;

    .sidebar {
        width: 150px;
        flex-grow:0;
        border: 1px solid red;
        border-radius: 8px;
    }

    .content {
        flex-grow:1;
        border: 1px solid red;
        border-radius: 8px;

    }

`

export const SlotNames = {
    EDITOR_BUTTONS: 'editor-buttons',
    TOOLBAR_BUTTONS: 'toolbar-buttons',
    SIDEBAR_BUTTONS: 'sidebar-buttons'
}

export const PageNames = {
    HOME_PAGE : 'home-page',
    SETTINGS_PAGE : 'settings-page'
}


const Toolbar = () => {

    return <div className='toolbar'>
        <Slot name={SlotNames.TOOLBAR_BUTTONS}>
            <button>Waiting</button>
        </Slot>
    </div>

}

const HomePage = () => {

    let pageName = PageNames.HOME_PAGE

    React.useEffect(() => {
        console.log(`1.1 mounted ${pageName}`)
        return () => {
            console.log(`1.2 unmounted ${pageName}`)
        }
    }, [])

    console.log(`-----> Rendered ${pageName}`)


    const renderContent = () => {
        return <>
            <div slot={SlotNames.TOOLBAR_BUTTONS} source={pageName}>
                <button>!!! Success !!!</button>
            </div>
            <h3>Home Page</h3>
        </>
    }

    const renderFiller = () => {
        return <SlotFiller source={pageName}>
            {renderContent()}
        </SlotFiller>

    }
    // return renderContent();
    return renderFiller();

}

const SettingsPage = () => {

    let pageName = PageNames.SETTINGS_PAGE

    React.useEffect(() => {
        console.log(`2.1 mounted ${pageName}`)
        return () => {
            console.log(`2.2 unmounted ${pageName}`)
        }
    }, [])

    console.log(`-----> Rendered ${pageName}`)

    return <SlotFiller source={pageName}>
        <div slot={SlotNames.TOOLBAR_BUTTONS} >
            <button>!!! Settings Page !!!</button>
        </div>
        <h3>Settings Page</h3>
    </SlotFiller>

}
const SomeApp = () => {

    const [showHomePage, setShowHomePage] = React.useState(true);

    return <div className="app">
        <h4>Welcome to the Dynamic Slots App</h4>
        <Toolbar />
        <button onClick={(e) => setShowHomePage(x => !x)}>Switch Page</button>
        <Layout>
            <div className="sidebar">
                <h4>Sidebar</h4>
                {/* <Slot name={SlotNames.SIDEBAR_BUTTONS}></Slot> */}
            </div>
            <div className="content">
                <h4>App Content</h4>
                {showHomePage ? <HomePage /> : <SettingsPage />}
            </div>
        </Layout>
    </div>

}
export default () => {
    const renderDynamicSlotsApp = () => {
        return <AppSlotsProvider>
            <SomeApp />
        </AppSlotsProvider>
    }
    const renderSimpleApp = () => {
        return <SimpleApp />
    }
    // return renderSimpleApp();
    return renderDynamicSlotsApp();
}