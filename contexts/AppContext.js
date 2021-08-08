import React, { createContext } from "react";

export const AppContext = createContext();

class AppContextProvider extends React.Component {
    state = {
        isAuth: false
    }
    checkIsAuth = () => {
        // do api check here
    }
    render() {
        return (
            <AppContext.Provider value={{
                ...this.state,
                changeSelectedTask: this.changeSelectedTask,
                resetSelectedTask: this.resetSelectedTask
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

export default AppContextProvider;