import { createContext, Component } from "react";

export const AppContext = createContext();

class AppContextProvider extends Component {
    state = {
        loading: true
    }
    setLoading = () => {
        this.setState({ loading: true });
    }
    setNotLoading = () => {
        this.setState({ loading: false });
    }
    toggleLoading = () => {
        this.setState({ loading: !this.state.loading });
    }
    render() {
        return (
            <AppContext.Provider value={{
                ...this.state,
                setLoading: this.setLoading,
                setNotLoading: this.setNotLoading,
                toggleLoading: this.toggleLoading
            }}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
};

export default AppContextProvider;