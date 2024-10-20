import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Footer } from "@/components/Footer/Footer";
import SideSheet from "@/components/common/SideSheet/SideSheet";
import EditAvatar from "@/components/EditAvatar/EditAvatar";
import "./App.scss";
import Root from "@/data/root";

const ROOT_DATA = Root.get()

function App() {
    const [isEditAvatarOpen, setIsEditAvatarOpen] = useState(false);

    useEffect(() => {
        setIsEditAvatarOpen(true);
    }, []);

    return (
        <div className={`app-container`}>
            <HashRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <SideSheet
                                isVisible={isEditAvatarOpen}
                                setIsVisible={setIsEditAvatarOpen}
                                transitionFromBottom={true}
                                onEnter={() => {
                                    document.body.style.overflow = "hidden";
                                }}
                            >
                                <EditAvatar creatures={ ROOT_DATA.creatures } />
                            </SideSheet>
                        }
                    ></Route>
                </Routes>
                <Footer />
            </HashRouter>
        </div>
    );
}

export default App;
