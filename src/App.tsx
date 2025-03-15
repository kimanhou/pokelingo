import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import SideSheet from "@/components/common/SideSheet/SideSheet";
import Home from "@/components/Home/Home";
import Learn from "@/components/Learn/Learn";
import QuizView from "@/components/Quiz/QuizView";
import creatureRepository from "@/model/creature/creature-repository";
import styles from "./App.module.scss";

function App() {
    const [isLearnOpen, setIsLearnOpen] = useState(false);

    useEffect(() => {
        setIsLearnOpen(true);
    }, []);

    return (
        <div className={styles.appContainer}>
            <HashRouter>
                <Routes>
                    <Route
                        path="/learn"
                        element={
                            <SideSheet
                                isVisible={isLearnOpen}
                                setIsVisible={setIsLearnOpen}
                                transitionFromBottom={true}
                                onEnter={() => {
                                    document.body.style.overflow = "hidden";
                                }}
                            >
                                <Learn
                                    creatures={creatureRepository.findAll()}
                                />
                            </SideSheet>
                        }
                    ></Route>
                    <Route
                        path="/quiz"
                        element={
                            <QuizView
                                creatures={creatureRepository.findAll()}
                            />
                        }
                    />
                    <Route path="/" element={<Home />}></Route>
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
