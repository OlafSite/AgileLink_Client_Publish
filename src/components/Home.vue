<template>
    <!-- Hero -->
    <section class="et-hero-tabs">
        <nav class="section__container nav__container">
            <div class="nav__logo">
                <h2>Agile Link</h2>
            </div>
            <ul class="nav__links">
                <li class="link"><a href="#tab-es6" v-scroll-to="{ el: '#tab-es6', duration: 500 }">团队管理</a></li>
                <li class="link"><a href="#tab-flexbox" v-scroll-to="{ el: '#tab-flexbox', duration: 500 }">团队交流</a></li>
                <li class="link"><a href="#tab-react" v-scroll-to="{ el: '#tab-react', duration: 500 }">项目管理</a></li>
                <li class="link"><a href="#tab-angular" v-scroll-to="{ el: '#tab-angular', duration: 500 }">文档编辑</a></li>
                <li class="link"><a href="#tab-other" v-scroll-to="{ el: '#tab-other', duration: 500 }">设计原型</a></li>
            </ul>
            <button class="contact__me__btn">Contact Me</button>
        </nav>
        <div class="section__container header__container">
            <div class="header__content">
                <p>Hello, Welcome to</p>
                <h1>Agile Link</h1>
                <p style="margin-top: 10px">A collaboration tool for team management and project management</p>
                <!--                <button class="button" type="button" @click="goToLogin()" >-->
                <!--                    Get Started-->
                <!--                    <div class="button__horizontal"></div>-->
                <!--                    <div class="button__vertical"></div>-->
                <!--                </button>-->
                <button class="custom-btn btn-3" style="margin-top: 20px;" @click="goToLogin()"><span>Get
                        Started</span></button>
            </div>
        </div>
        <div class="et-hero-tabs-container">
            <a class="et-hero-tab" href="#tab-es6" v-scroll-to="{ el: '#tab-es6', duration: 500 }">团队管理</a>
            <a class="et-hero-tab" href="#tab-flexbox" v-scroll-to="{ el: '#tab-flexbox', duration: 500 }">团队交流</a>
            <a class="et-hero-tab" href="#tab-react" v-scroll-to="{ el: '#tab-react', duration: 500 }">项目管理</a>
            <a class="et-hero-tab" href="#tab-angular" v-scroll-to="{ el: '#tab-angular', duration: 500 }">文档编辑</a>
            <a class="et-hero-tab" href="#tab-other" v-scroll-to="{ el: '#tab-other', duration: 500 }">设计原型</a>
            <span class="et-hero-tab-slider"></span>
        </div>
    </section>

    <!-- Main -->
    <main class="et-main">
        <section class="et-slide-sec1" id="tab-es6">
            <div class="section__container services__container">
                <div class="services__content__1">
                    <h2 class="section__title">团队管理</h2>
                    <ul class="section__list">
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">多团队便捷切换</span>
                        </li>
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">直观查阅团队信息</span>
                        </li>
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">轻松管理团队成员</span>
                        </li>
                        <li class="section__li__content">
                            <button class="custom-btn btn-3" @click="goToLogin()"><span>前往体验</span></button>
                            <!--                            <button class="section__button" @click="goToLogin()">前往体验</button>-->
                        </li>
                    </ul>
                </div>
                <div class="services__grid__1">
                    <img src="../assets/headpot/team.png" class="big-sur-img" alt />
                </div>
            </div>
        </section>

        <section class="et-slide-sec2" id="tab-flexbox">
            <div class="section__container services__container">
                <div class="services__grid__2">
                    <img src="../assets/headpot/chat.png" class="big-sur-img" alt />
                </div>
                <div class="services__content__2">
                    <h2 class="section__title">团队交流</h2>
                    <ul class="section__list">
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">私聊、多人群聊实时同步</span>
                        </li>
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">专属@提醒、聊天记录搜索跳转</span>
                        </li>
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">文本、图片、文件多类型支持</span>
                        </li>
                        <li class="section__li__content">
                            <button class="custom-btn btn-3" @click="goToLogin()"><span>前往体验</span></button>
                        </li>

                    </ul>
                </div>
            </div>
        </section>

        <section class="et-slide-sec3" id="tab-react">
            <div class="section__container services__container">
                <div class="services__content__3">
                    <h2 class="section__title">项目管理</h2>
                    <ul class="section__list">
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">增删改查排、搜索一应俱全</span>
                        </li>
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">一键复制，创建副本</span>
                        </li>
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">操作简便，直观管理</span>
                        </li>
                        <li class="section__li__content">
                            <button class="custom-btn btn-3" @click="goToLogin()"><span>前往体验</span></button>
                        </li>
                    </ul>
                </div>
                <div class="services__grid__3">
                    <img src="../assets/headpot/project.png" class="big-sur-img" alt />
                </div>
            </div>
        </section>

        <section class="et-slide-sec4" id="tab-angular">
            <div class="section__container services__container">
                <div class="services__grid__4">
                    <img src="../assets/headpot/doc.png" class="big-sur-img" alt />
                </div>
                <div class="services__content__4">
                    <h2 class="section__title">文档编辑</h2>
                    <ul class="section__list">
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">单栏即时渲染，多人协同光标编辑</span>
                        </li>
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">多文档模板提供</span>
                        </li>
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">文档层级管理、存档版本回退</span>
                        </li>
                        <li class="section__li__content">
                            <button class="custom-btn btn-3" @click="goToLogin()"><span>前往体验</span></button>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="et-slide-sec5" id="tab-other">
            <div class="section__container services__container">
                <div class="services__content__5">
                    <h2 class="section__title">原型设计</h2>
                    <ul class="section__list">
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">界面简洁易懂、高效设计原型</span>
                        </li>
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">图片、HTML等格式导出</span>
                        </li>
                        <li class="section__li__content">
                            <div class="dot"></div>
                            <span class="section__li__text">在线预览、直观展示</span>
                        </li>
                        <li class="section__li__content">
                            <button class="custom-btn btn-3" @click="goToLogin()"><span>前往体验</span></button>
                        </li>
                    </ul>
                </div>
                <div class="services__grid__5">
                    <img src="../assets/headpot/design.png" class="big-sur-img" alt />
                </div>
            </div>
        </section>

        <section class="et-slide-sec">
            <div class="foot_container">
                <h2 class="foot__text">
                    即刻开始
                    <br>
                    体验团队高效协作与管理
                </h2>
                <br>
                <button class="foot__button" @click="goToLogin()">前往使用</button>
            </div>
        </section>
    </main>
</template>

<script setup>
import $ from 'jquery';
import { ref } from 'vue'
import { useRouter } from "vue-router";
const router = useRouter()

function goToLogin() {
    router.push('/login')
    // console.log(position.value)
}

import VueScrollTo from "vue-scrollto";
// function onMouseOver(event) {
//     // 获取目标元素的ID
//     const target = event.target.getAttribute("href");
//
//     // 滚动到目标元素
//     VueScrollTo.scrollTo(target, 500);
// }

class StickyNavigation {

    constructor() {
        this.currentId = null;
        this.currentTab = null;
        this.tabContainerHeight = 70;
        let self = this;
        $('.et-hero-tab').click(function () {
            self.onTabClick(event, $(this));
        });
        // $('.et-hero-tab').mouseover(function() {
        //     self.onTabOver(event, $(this));
        // });
        $(window).scroll(() => { this.onScroll(); });
        $(window).resize(() => { this.onResize(); });
    }

    onTabClick(event, element) {
        event.preventDefault();
        let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
        $('html, body').animate({ scrollTop: scrollTop }, 600);
    }
    // onTabOver(event, element) {
    //     event.preventDefault();
    //     let scrollTop = $(element.attr('href')).offset().top - this.tabContainerHeight + 1;
    //     $('html, body').animate({ scrollTop: scrollTop }, 600);
    // }

    onScroll() {
        this.checkTabContainerPosition();
        this.findCurrentTabSelector();
    }

    onResize() {
        if (this.currentId) {
            this.setSliderCss();
        }
    }

    checkTabContainerPosition() {
        let offset = $('.et-hero-tabs').offset().top + $('.et-hero-tabs').height() - this.tabContainerHeight;
        if ($(window).scrollTop() > offset) {
            $('.et-hero-tabs-container').addClass('et-hero-tabs-container--top');
        }
        else {
            $('.et-hero-tabs-container').removeClass('et-hero-tabs-container--top');
        }
    }

    findCurrentTabSelector(element) {
        let newCurrentId;
        let newCurrentTab;
        let self = this;
        $('.et-hero-tab').each(function () {
            let id = $(this).attr('href');
            let offsetTop = $(id).offset().top - self.tabContainerHeight;
            let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
            if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
                newCurrentId = id;
                newCurrentTab = $(this);
            }
        });
        if (this.currentId != newCurrentId || this.currentId === null) {
            this.currentId = newCurrentId;
            this.currentTab = newCurrentTab;
            this.setSliderCss();
        }
    }

    setSliderCss() {
        let width = 0;
        let left = 0;
        if (this.currentTab) {
            width = this.currentTab.css('width');
            left = this.currentTab.offset().left;
        }
        $('.et-hero-tab-slider').css('width', width);
        $('.et-hero-tab-slider').css('left', left);
    }

}

new StickyNavigation();

// const element = ref(null)
// const position = ref();
// window.onload = function () {
//     element.value = document.querySelector('.section__li__content');
//     position.value = element.getBoundingClientRect().top;
// }
// window.addEventListener('scroll', function() {
//     if(window.pageYOffset > position) {
//         element.classList.add('active');
//     }
// });
window.addEventListener('scroll', function () {
    let top = window.scrollY
    let height = window.innerHeight
    if (top > height * 0.6) {
        $('.services__content__1').css('opacity', '1')
        $('.services__content__1').css('transform', 'translateY(0px)')
        $('.services__grid__1').css('opacity', '1')
        $('.services__grid__1').css('transform', 'translateX(0px)')

    } else {
        $('.services__content__1').css('opacity', '0')
        $('.services__content__1').css('transform', 'translateY(400px)')
        $('.services__grid__1').css('opacity', '1')
        $('.services__grid__1').css('transform', 'translateX(1200px)')
    }
    if (top > height * 1.6) {
        $('.services__content__2').css('opacity', '1')
        $('.services__content__2').css('transform', 'translateY(0px)')
        $('.services__grid__2').css('opacity', '1')
        $('.services__grid__2').css('transform', 'translateX(0px)')

    } else {
        $('.services__content__2').css('opacity', '0')
        $('.services__content__2').css('transform', 'translateY(400px)')
        $('.services__grid__2').css('opacity', '1')
        $('.services__grid__2').css('transform', 'translateX(-1200px)')
    }
    if (top > height * 2.6) {
        $('.services__content__3').css('opacity', '1')
        $('.services__content__3').css('transform', 'translateY(0px)')
        $('.services__grid__3').css('opacity', '1')
        $('.services__grid__3').css('transform', 'translateX(0px)')

    } else {
        $('.services__content__3').css('opacity', '0')
        $('.services__content__3').css('transform', 'translateY(400px)')
        $('.services__grid__3').css('opacity', '1')
        $('.services__grid__3').css('transform', 'translateX(1200px)')
    }
    if (top > height * 3.6) {
        $('.services__content__4').css('opacity', '1')
        $('.services__content__4').css('transform', 'translateY(0px)')
        $('.services__grid__4').css('opacity', '1')
        $('.services__grid__4').css('transform', 'translateX(0px)')

    } else {
        $('.services__content__4').css('opacity', '0')
        $('.services__content__4').css('transform', 'translateY(400px)')
        $('.services__grid__4').css('opacity', '1')
        $('.services__grid__4').css('transform', 'translateX(-1200px)')
    }
    if (top > height * 4.6) {
        $('.services__content__5').css('opacity', '1')
        $('.services__content__5').css('transform', 'translateY(0px)')
        $('.services__grid__5').css('opacity', '1')
        $('.services__grid__5').css('transform', 'translateX(0px)')

    } else {
        $('.services__content__5').css('opacity', '0')
        $('.services__content__5').css('transform', 'translateY(400px)')
        $('.services__grid__5').css('opacity', '1')
        $('.services__grid__5').css('transform', 'translateX(1200px)')
    }
})

</script>

<style scoped>
:root {
    --primary-color: #763ae0;
    --primary-color-dark: #6345fb;
    --secondary-color: #a0d333;
    --bg-color: #fafafb;
    --text-dark: #333333;
    --text-light: #767268;
    --white: #ffffff;
    --max-width: 1200px;
}

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

.et-main {
    width: 100%;
    /*overflow-x: hidden;*/
}

.section__container {
    max-width: var(--max-width);
    margin: auto;
    padding: 10rem 1rem;
}

.foot_container {
    max-width: var(--max-width);
    margin: auto;
}

.foot_container .foot__text {
    font-size: 45px;
    font-weight: 700;
    color: #fff;
}

.foot_container .foot__button {
    margin-top: 20px;
    width: 200px;
    height: 60px;
    border-radius: 30px;
    color: #311c4b;
    background-color: #fff;
    font-size: 18px;
    font-weight: bold;
}

.services__container {
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 5rem;
    overflow: hidden;
}

.dot {
    height: 18px;
    width: 18px;
    background-color: #311c4b;
    border-radius: 18px;
    box-shadow: 2px 2px 2px 2px rgba(49, 28, 75, 0.2);
}

/*card*/
.services__content__1 {
    margin-left: 100px;
    transform: translateY(400px);
    opacity: 0;
    transition: .6s;
}

.services__content__2 {
    margin-left: 100px;
    transform: translateY(400px);
    opacity: 0;
    transition: .6s;
}

.services__content__3 {
    margin-left: 100px;
    transform: translateY(400px);
    opacity: 0;
    transition: .6s;
}

.services__content__4 {
    margin-left: 100px;
    transform: translateY(400px);
    opacity: 0;
    transition: .6s;
}

.services__content__5 {
    margin-left: 100px;
    transform: translateY(400px);
    opacity: 0;
    transition: .6s;
}

.section__title {
    margin-top: 80px;
    margin-bottom: 40px;
    font-size: 70px;
    text-align: left;
}

.section__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.section__li__content {
    display: flex;
    align-items: center;
}

.section__li__text {
    margin: 15px;
    font-size: 24px;
}

.section__button {
    margin-top: 40px;
    width: 200px;
    height: 60px;
    border-radius: 30px;
    color: #f9f9f9;
    background-color: #311c4b;
    font-size: 20px;
}


.custom-btn {
    margin-top: 40px;
    width: 200px;
    height: 60px;
    color: #fff;
    border-radius: 30px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    font-size: 20px;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
    outline: none;
}

.btn-3 {
    background: rgb(111, 96, 129);
    background: linear-gradient(0deg, rgba(111, 96, 129, 1) 0%, rgba(49, 28, 75, 1) 100%);
    width: 200px;
    height: 60px;
    line-height: 60px;
    padding: 0;
    border: none;

}

.btn-3 span {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
}

.btn-3:before,
.btn-3:after {
    position: absolute;
    content: "";
    right: 0;
    top: 0;
    background: rgba(49, 28, 75, 1);
    transition: all 0.3s ease;
}

.btn-3:before {
    height: 0%;
    width: 2px;
}

.btn-3:after {
    width: 0;
    height: 2px;
}

.btn-3:hover {
    background: transparent;
    box-shadow: none;
}

.btn-3:hover:before {
    height: 100%;
}

.btn-3:hover:after {
    width: 100%;
}

.btn-3 span:hover {
    color: rgba(49, 28, 75, 1);
}

.btn-3 span:before,
.btn-3 span:after {
    position: absolute;
    content: "";
    left: 0;
    bottom: 0;
    background: rgba(49, 28, 75, 1);
    transition: all 0.3s ease;
}

.btn-3 span:before {
    width: 2px;
    height: 0;
}

.btn-3 span:after {
    width: 0;
    height: 2px;
}

.btn-3 span:hover:before {
    height: 100%;
}

.btn-3 span:hover:after {
    width: 100%;
}


/*.services__grid{*/
/*    min-width: 800px;*/
/*    min-height: 600px;*/
/*    box-shadow:10px 10px 10px 10px rgba(0, 0, 0, 0.1);*/
/*}*/

.services__grid__1 {
    width: 1000px;
    transform: translateX(1200px);
    opacity: 0;
    transition: .6s;
}

.services__grid__2 {
    width: 1000px;
    transform: translateX(-1200px);
    opacity: 0;
    transition: .6s;
}

.services__grid__3 {
    width: 1000px;
    transform: translateX(1200px);
    opacity: 0;
    transition: .6s;
}

.services__grid__4 {
    width: 1000px;
    transform: translateX(-1200px);
    opacity: 0;
    transition: .6s;
}

.services__grid__5 {
    width: 1000px;
    transform: translateX(1200px);
    opacity: 0;
    transition: .6s;
}

.big-sur-img {
    width: 1000px;
    border-radius: 30px;
    box-shadow: 10px 10px 10px 10px rgba(0, 0, 0, 0.1);
}

img {
    width: 100%;
}

a {
    text-decoration: none;
}

body {
    font-family: "Poppins", sans-serif;
}


.nav__container {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.nav__logo h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--secondary-color);
}

.nav__links {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.link a {
    padding: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: var(--white);
    transition: 0.3s;
}

.link a:hover {
    color: var(--secondary-color);
}

.contact__me__btn {
    padding: 1rem 2rem;
    outline: none;
    border: 1px solid var(--white);
    font-size: 1rem;
    font-weight: 500;
    color: var(--white);
    background-color: transparent;
    cursor: pointer;
}

.header__container {
    min-height: calc(100vh - 100px);
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.header__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    grid-area: 1/2/2/2;
    /*margin-bottom: 100px;*/
}

.header__content p {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--white);
}

.header__content h1 {
    font-size: 4rem;
    font-weight: 600;
    line-height: 4rem;
    color: var(--white);
}


.services__card__content h4 {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: var(--text-dark);
}

.services__card__content p {
    font-size: 0.9rem;
    color: var(--text-light);
}


.skill__card img {
    max-width: 75px;
    margin: auto;
}

.skill__card p {
    font-size: 0.9rem;
    font-weight: 500;
}

.portfolio__nav a {
    padding: 0.5rem;
    color: var(--text-dark);
    font-size: 1rem;
    font-weight: 500;
    transition: 0.3s;
}

.portfolio__nav a:hover {
    color: var(--secondary-color);
}

.portfolio__card img {
    display: block;
}

.client__card p {
    font-size: 0.9rem;
    color: var(--text-light);
}

.client__card__footer h4 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0;
}

.client__card__footer img {
    max-width: 50px;
    border-radius: 100%;
}



footer {
    background: linear-gradient(to right, rgb(118, 58, 224), rgb(99, 69, 251));
}

.footer__col h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--secondary-color);
    margin-bottom: 2rem;
}

.footer__col form {
    display: flex;
}

.footer__col input {
    width: 100%;
    max-width: 200px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    outline: none;
    border: none;
}

.footer__col button {
    padding: 0.5rem;
    font-size: 1rem;
    color: var(--white);
    outline: none;
    border: none;
    background-color: var(--secondary-color);
    cursor: pointer;
}

.footer__col h4 {
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--white);
    margin-bottom: 2rem;
}

.footer__col p {
    font-size: 1rem;
    color: var(--white);
    margin-bottom: 1rem;
    cursor: pointer;
    transition: 0.3s;
}

.social__icons span {
    font-size: 1.5rem;
    color: var(--white);
    cursor: pointer;
    transition: 0.3s;
}

.footer__col :is(p:hover, span:hover) {
    color: var(--secondary-color);
}

@media (width < 900px) {
    .nav__links {
        display: none;
    }
}

@media (width < 600px) {
    .header__content {
        grid-area: 1/1/2/2;
    }
}
</style>

<style lang="scss" scoped>
//{
//    width: max-content;
//    border-radius: 5px;
//    background-color: #311c4b;
//    color: #f9f9f9;
//    margin-top: 2rem;
//}
.button {

    --offset: 10px;
    --border-size: 2px;

    display: block;
    position: relative;
    padding: 1.5em 3em;
    margin-top: 20px;
    margin-left: 10px;
    width: 200px;
    appearance: none;
    border: 0;
    //background: transparent;
    //color: #311c4b;
    color: #f9f9f9;
    background-color: #311c4b;
    text-transform: uppercase;
    letter-spacing: .25em;
    outline: none;
    cursor: pointer;
    font-weight: bold;
    border-radius: 0;
    box-shadow: inset 0 0 0 var(--border-size) currentcolor;
    transition: background .8s ease;

    &:hover {
        //background: rgba(100, 0, 0, .03);
        color: #311c4b;
        background-color: transparent;
    }

    &__horizontal,
    &__vertical {
        position: absolute;
        top: var(--horizontal-offset, 0);
        right: var(--vertical-offset, 0);
        bottom: var(--horizontal-offset, 0);
        left: var(--vertical-offset, 0);
        transition: transform .8s ease;
        will-change: transform;

        &::before {
            content: '';
            position: absolute;
            border: inherit;
        }
    }

    &__horizontal {
        color: #311c4b;
        --vertical-offset: calc(var(--offset) * -1);
        border-top: var(--border-size) solid currentcolor;
        border-bottom: var(--border-size) solid currentcolor;

        &::before {
            top: calc(var(--vertical-offset) - var(--border-size));
            bottom: calc(var(--vertical-offset) - var(--border-size));
            left: calc(var(--vertical-offset) * -1);
            right: calc(var(--vertical-offset) * -1);
        }
    }

    &:hover &__horizontal {
        transform: scaleX(0);
    }

    &__vertical {
        color: #311c4b;
        --horizontal-offset: calc(var(--offset) * -1);
        border-left: var(--border-size) solid currentcolor;
        border-right: var(--border-size) solid currentcolor;

        &::before {
            top: calc(var(--horizontal-offset) * -1);
            bottom: calc(var(--horizontal-offset) * -1);
            left: calc(var(--horizontal-offset) - var(--border-size));
            right: calc(var(--horizontal-offset) - var(--border-size));
        }
    }

    &:hover &__vertical {
        transform: scaleY(0);
    }
}



body {
    font-family: "Century Gothic", 'Lato', sans-serif;
}

a {
    text-decoration: none;
}

.et-hero-tabs {
    position: relative;
    height: 100vh;
    //isolation: isolate;
}

.et-hero-tabs::before {
    position: absolute;
    content: "";
    background:
        //    linear-gradient(
        //        to right,
        //        rgba(231,238,255, 0.5),
        //        rgba(192,220,255, 0.5)
        //),
        //url("../assets/headpot/assets/header.png");
        url(https://images.modao.cc/images/images-2023/home/video-bg.png);
    transform: scaleX(-1);
    background-position: top left;
    background-size: cover;
    background-repeat: no-repeat;
    inset: 0;
    clip-path: polygon(0 0, 100% 0, 100% 93%, 0% 83%);
    z-index: -1;
}

.et-slide,
.et-slide-sec1,
.et-slide-sec2,
.et-slide-sec3,
.et-slide-sec4,
.et-slide-sec5 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
    background: #ffffff;
    text-align: center;
    padding: 0 2em;

    h1 {
        font-size: 2rem;
        margin: 0;
        letter-spacing: 1rem;
    }

    h3 {
        font-size: 1rem;
        letter-spacing: 0.3rem;
        opacity: 0.6;
    }
}

.et-slide-sec {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40vh;
    position: relative;
    background: linear-gradient(0deg, #311c4b, #5a496f);
    text-align: center;
    padding: 0 2em;

    h1 {
        font-size: 2rem;
        margin: 0;
        letter-spacing: 1rem;
    }

    h3 {
        font-size: 1rem;
        letter-spacing: 0.3rem;
        opacity: 0.6;
    }
}

.et-slide-sec1,
.et-slide-sec5 {
    background-image: url(https://images.modao.cc/images/images-2023/home/section-bg3.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.et-slide-sec2,
.et-slide-sec4 {
    background-image: url(https://images.modao.cc/images/images-2023/home/section-bg2.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

.et-slide-sec3 {
    background-image: url(https://images.modao.cc/images/images-2023/home/section-bg1.png);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

//background-image: url(https://images.modao.cc/images/images-2023/home/section-bg3.png);
.et-hero-tabs-container {
    display: flex;
    flex-direction: row;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 70px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background: #fff;
    z-index: 10;

    &--top {
        position: fixed;
        top: 0;
    }
}

.et-hero-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    color: #000;
    letter-spacing: 0.1rem;
    transition: all 0.5s ease;
    font-size: 0.8rem;

    &:hover {
        color: white;
        background: rgba(49, 28, 75, 0.8);
        //background: #311c4b;
        transition: all 0.5s ease;
    }
}

.et-hero-tab-slider {
    position: absolute;
    bottom: 0;
    width: 0;
    height: 6px;
    background: #311c4b;
    transition: left 0.3s ease;
}

@media (min-width: 800px) {

    .et-hero-tabs,
    .et-slide,
    .et-slide-sec1,
    .et-slide-sec2,
    .et-slide-sec3,
    .et-slide-sec4,
    .et-slide-sec5 {
        h1 {
            font-size: 3rem;
        }

        h3 {
            font-size: 1rem;
        }
    }

    .et-slide {
        h2 {
            font-size: 30px;
        }
    }

    .et-hero-tab {
        font-size: 1rem;
    }
}
</style>


