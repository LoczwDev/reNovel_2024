import React from 'react';
import { images } from '../constants';
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { BiLogoTiktok } from "react-icons/bi";
import { AiFillInstagram } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

const Footer = () => {
    return (
        <section className='bg-darkest'>
            <footer className='container mx-auto grid grid-cols-10 px-5 py-10 gap-y-10 gap-x-5 md:pt-20 md:grid-cols-12 lg:grid-cols-10'>
                <div className='col-span-5 md:col-span-4 lg:col-span-2'>
                    <h3 className='text-dark-light font-bold text-xl'>CONTACTS</h3>
                    <ul className='text-slate-400 text-sm mt-5 space-y-4 list-none'>
                        <li>
                            <a href="/">Dịch giả & Biên tập viên</a>
                        </li>
                        <li>
                            <a href="/">Thương mại</a>
                        </li>
                        <li>
                            <a href="/">Kinh doanh âm thanh</a>
                        </li>
                        <li>
                            <a href="/">Trợ giúp &; Dịch vụ</a>
                        </li>
                        <li>
                            <a href="/">Thông báo DMCA</a>
                        </li>
                        <li>
                            <a href="/">Diễn đàn Webnovel</a>
                        </li>
                        <li>
                            <a href="/">Dịch vụ trực tuyến</a>
                        </li>
                        <li>
                            <a href="/">Báo cáo lỗ hổng</a>
                        </li>

                    </ul>
                </div>
                <div className='col-span-5 md:col-span-4 lg:col-span-2'>
                    <h3 className='text-dark-light font-bold text-xl'>TÀI NGUYÊN</h3>
                    <ul className='text-slate-400 text-sm mt-5 space-y-4 list-none'>
                        <li>
                            <a href="/">Thẻ</a>
                        </li>
                        <li>
                            <a href="/">Tải Xuống ứng dụng</a>
                        </li>
                        <li>
                            <a href="/">Hãy là một tác giả</a>
                        </li>
                        <li>
                            <a href="/">Trung tâm trợ giúp</a>
                        </li>
                        <li>
                            <a href="/">Chính sách quyền riêng tư</a>
                        </li>
                        <li>
                            <a href="/">Điều khoản và dịch vụ</a>
                        </li>
                        <li>
                            <a href="/">Từ khóa</a>
                        </li>
                        <li>
                            <a href="/">Liên kết</a>
                        </li>

                    </ul>
                </div>
                <div className='col-span-5 md:col-span-4 md:col-start-5 lg:col-span-2 lg:col-start-auto'>
                    <h3 className='text-dark-light font-bold text-xl'>ĐỘI</h3>
                    <ul className='text-slate-400 text-sm mt-5 space-y-4 list-none'>
                        <li>
                            <a href="/">Về</a>
                        </li>
                        <li>
                            <a href="/">Tin Tức</a>
                        </li>
                        <li>
                            <a href="/">Phương Châm Thương Hiệu</a>
                        </li>

                    </ul>
                </div>
                <div className='col-span-5 md:col-span-4 lg:col-span-2'>
                    <h3 className='text-dark-light font-bold text-xl'>GIỚI THIỆU</h3>
                    <ul className='text-slate-400 text-sm mt-5 space-y-4 list-none'>
                        <li>
                            <a href="/">Trần Hữu Lộc</a>
                        </li>
                        <li>
                            <a href="/">Mục Tử</a>
                        </li>

                    </ul>
                </div>
                <div className='col-span-10 text-center md:order-first md:col-span-4 lg:col-span-2'>
                    <img className='w-50 brightness-0 invert mx-auto' src={images.Logo} alt="logo" />
                    <p className='text-sm text-dark-light '>Read the most interesting articles</p>
                    <ul className='flex justify-center items-center mt-5 space-x-4 text-gray-300 list-none'>
                        <li>
                            <a href="/"><AiFillInstagram /></a>
                        </li>
                        <li>
                            <a href="/"><BiLogoTiktok /></a>
                        </li>
                        <li>
                            <a href="/"><FaTwitter /></a>
                        </li>
                        <li>
                            <a href="/"><FaFacebook /></a>
                        </li>
                        <li>
                            <a href="/"><FaYoutube /></a>
                        </li>

                    </ul>
                </div>
                <div className='hidden  md:flex flex-col items-center space-y-4 md:col-span-12'>
                    <div className='bg-violet text-white p-3 rounded-full '>
                        <FaHeart className='w-7 h-auto' />
                    </div>
                    <p className='font-bold text-xl italic text-dark-light'>© 2024 WebNovel</p>

                </div>

            </footer>
        </section>
    );
};

export default Footer; Footer