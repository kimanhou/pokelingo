import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Footer } from "@/components/Footer/Footer";
import SideSheet from "@/components/common/SideSheet/SideSheet";
import Learn from "@/components/Learn/Learn";
import Root from "@/model/root";
import "./App.scss";

const ROOT_DATA = Root.get();

function App() {
    const [isLearnOpen, setIsLearnOpen] = useState(false);

    useEffect(() => {
        setIsLearnOpen(true);
    }, []);

    return (
        <div className={`app-container`}>
            <HashRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <SideSheet
                                isVisible={isLearnOpen}
                                setIsVisible={setIsLearnOpen}
                                transitionFromBottom={true}
                                onEnter={() => {
                                    document.body.style.overflow = "hidden";
                                }}
                            >
                                <Learn creatures={ROOT_DATA.creatures} />
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
