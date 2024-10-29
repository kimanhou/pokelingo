import { useEffect, useState } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Footer } from "@/components/Footer/Footer";
import SideSheet from "@/components/common/SideSheet/SideSheet";
import Learn from "@/components/Learn/Learn";
import QuizView from "@/components/Quiz/QuizView";
import creatureRepository from "@/model/creature/creature-repository";
import "./App.scss";

function App() {
    const [isQuiz, setIsQuiz] = useState(false);
    const [isLearnOpen, setIsLearnOpen] = useState(false);

    useEffect(() => {
        setIsLearnOpen(true);
    }, []);

    return (
        <div className={`app-container`}>
            <div style={{
                position: "fixed",
                top: "0",
                left: "0",
                zIndex: 10
            }}>
                <input type="checkbox" value={isQuiz ? "true" : "false"} onChange={() => setIsQuiz(isQuiz => !isQuiz)} />
            </div>
            {isQuiz &&
                <QuizView creatures={creatureRepository.findAll()} />
            }
            {! isQuiz && 
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
                                    <Learn creatures={creatureRepository.findAll()} />
                                </SideSheet>
                            }
                        ></Route>
                    </Routes>
                    <Footer />
                </HashRouter>
            }
        </div>
    );
}

export default App;
