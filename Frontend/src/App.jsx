import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Toaster} from "react-hot-toast"

import ProtectedRoutes from "./UI/ProtectedRoutes";
import AppLayout from "./UI/AppLayout";
import Account from "./Pages/Account";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import QuizInfo from "./Pages/QuizInfo";
import Quiz from "./Pages/Quiz";
import Result from "./Pages/Result";
import LeaderBoard from "./Pages/LeaderBoard";
import UpdateAccount from "./Pages/UpdateAccount";
import UserRoutes from "./UI/UserRoutes";
import AdminRoutes from "./UI/AdminRoutes";
import UpdateAllUsers from "./Features/Admin/UpdateAllUsers";
import UpdateQuizQuestions from "./Features/Admin/UpdateQuizQuestions";
import PageNotFound from "./Pages/PageNotFound";
import ForgetPassword from "./Pages/ForgetPassword";
import ResetPassword from "./Pages/ResetPassword";

function App() {
    const queryClient = new QueryClient({
        defaultOptions : {
            queries : {
                staleTime : 0,
            }
        }
    })

    return <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <BrowserRouter>
            <Routes>
                <Route element = {<ProtectedRoutes> <AppLayout /> </ProtectedRoutes>}>
                    <Route element = {<UserRoutes />}>
                        <Route index element = {<Navigate replace to="account" />} />
                        <Route path = "account" element = {<Account />} />
                        <Route path = "quizInfo" element = {<QuizInfo />} />
                        <Route path = "quiz" element = {<Quiz />} />
                        <Route path = "result" element = {<Result />} />
                        <Route path = "leaderboard" element = {<LeaderBoard />} />
                        <Route path = "updateAccount" element = {<UpdateAccount />} />
                    </Route>

                    <Route element = {<AdminRoutes />}>
                        <Route path="admin" element={<Navigate replace to="/admin/updateAllUsers" />} />
                        <Route path="admin/updateAllUsers" element={<UpdateAllUsers />} />
                        <Route path = "admin/updateQuizQuestions" element = {<UpdateQuizQuestions />} />
                        <Route path = "admin/updateAccount" element = {<UpdateAccount />} />
                    </Route>
                </Route>
                    <Route path="login" element = {<Login />} />
                    <Route path="signup" element = {<SignUp />} />
                    <Route path = "forgetPassword" element = {<ForgetPassword />} />
                    <Route path = "resetPassword/:resetToken" element = {<ResetPassword />} />
                    <Route path = "*" element = {<PageNotFound />} />
            </Routes>
        </BrowserRouter>

        <Toaster position="top-center" gutter={12} containerStyle={{ margin: "8px" }} toastOptions={
            {
                success : {duration : 3000},
                error : {duration : 5000},
                style : {
                    fontSize: "16px",
                    maxWidth: "500px",
                    padding: "16px 24px",
                    backgroundColor: "#ced4da",
                    color: "#181B22",
                }
            }} />
    </QueryClientProvider>
}
export default App;
