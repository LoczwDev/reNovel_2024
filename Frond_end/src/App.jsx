import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/home/HomePage";
import ArticleDetailPage from "./pages/articleDetail/ArticleDetailPage";
import RegisterPage from "./pages/register/RegisterPage";
import { Toaster } from "react-hot-toast";
import LoginPage from "./pages/login/LoginPage";
import ProfilePage from "./pages/profile/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import { Admin } from "./pages/admin/srceens/Admin";
import PostNew from "./pages/admin/srceens/posts/PostNew";
import PostManage from "./pages/admin/srceens/posts/PostManage.jsx";
import { EditPost } from "./pages/admin/srceens/posts/EditPost.jsx";
// import { AllArcticlePage } from "./pages/allArcticle/AllArcticlePage.jsx";
import { FillterArcticlePage } from "./pages/allArcticle/FillterArcticlePage.jsx";
import Users from "./pages/admin/srceens/users/Users.jsx";
import { CategoryPost } from "./pages/admin/srceens/categoryPost/CategoryPost.jsx";
import { EditCategoryPage } from "./pages/admin/components/EditCategoryPage.jsx";
import { EditPostUser } from "./pages/profile/container/EditPostUser.jsx";
import { TagsManage } from "./pages/admin/srceens/tags/TagsManage.jsx";
import { CommentsMannager } from "./pages/admin/srceens/comments/CommentsMannager.jsx";
import SearchSuggest from "./components/SearchSuggest.jsx";
import { DashBoardAdmin } from "./pages/admin/srceens/dashBoard/DashBoardAdmin.jsx";
import RegisterForm from "./pages/register/RegisterForm.jsx";
import { SuccsessPage } from "./components/statusPayment/SuccsessPage.jsx";

export default function App() {
  return (
    <div className="App font-montserrat">
      <Routes>
        <Route path="/test" element={<SearchSuggest />} />
        <Route index path="/" element={<HomePage />} />
        <Route path="/article/:slug" element={<ArticleDetailPage />} />
        <Route path="/success/:pdfId/:slug" element={<SuccsessPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/articles" element={<FillterArcticlePage />} />
        <Route path="/posts/manage/edit/:slug" element={<EditPostUser />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashBoardAdmin />} />
          <Route path="users" element={<Users />} />
          <Route path="categorypost" element={<CategoryPost />} />
          <Route path="tags" element={<TagsManage />} />
          <Route path="comments" element={<CommentsMannager />} />
          <Route path="posts/manage" element={<PostManage />} />
          <Route path="posts/manage/edit/:slug" element={<EditPost />} />
          <Route
            path="category/edit/:categoryId"
            element={<EditCategoryPage />}
          />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}
