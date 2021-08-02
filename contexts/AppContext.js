import React, { createContext } from "react";

export const AppContext = createContext();

class AppContextProvider extends React.Component {
    state = {
        selectedTask: undefined // Array position of the user's tasks
    }
    changeSelectedTask = (t) => {
        this.setState({ selectedTask: t });
        return this.state.selectedTask;
    }
    resetSelectedTask = () => {
        this.setState({ selectedTask: undefined });
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