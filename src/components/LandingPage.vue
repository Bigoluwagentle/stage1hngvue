<template>
    <div id="landing">
        <header>
            <h2>Ticketly</h2>
            <nav>
                <button @click="router.push('/Login')">Login</button>
                <button @click="router.push('/Signup')">Get Started</button>
            </nav>
        </header>
        <main>
            <div>
                <h1>Manage Your Ticket with Ease</h1>
                <p>Track, update, and resolve issues faster.</p>
                <nav>
                    <button @click="router.push('/Signup')">Get Started</button>
                    <button @click="router.push('/Login')">Login Now</button>
                </nav>
            </div>
            <img :src="hero" alt="Hero" />
        </main>

        <h1>HOW IT WORK</h1>
        <section>
            <article>
                <i class="fa-solid fa-square-plus"></i>
                <h4>Create Tickets</h4>
                <p>Quickly open new support or task tickets with essential details. Stay organized and never lose track of what needs attention.</p>
            </article>
            <article>
                <i class="fa-solid fa-bars-progress"></i>
                <h4>Track Progress</h4>
                <p>Monitor every ticket in real time from open to in-progress to resolved. Stay informed with clear status updates.</p>
            </article>
            <article>
                <i class="fa-brands fa-resolving"></i>
                <h4>Resolve Easily</h4>
                <p>Close issues faster with intuitive tools that simplify communication and resolution. Boost team efficiency effortlessly.</p>
            </article>
        </section>

        <summary>
            <section>
                <img :src="Image" alt="Hero" />
                <h4>Sarah M.</h4>
                <p>Using this ticket app has changed the way our team works. It’s fast, clean, and easy to navigate — we resolve issues in half the time now!</p>
                <li>Operations Manager</li>
            </section>
            <section>
                <img :src="Image" alt="Hero" />
                <h4>Daniel K.</h4>
                <p>I can finally track every ticket without stress. The dashboard is super clear, and I love how updates happen instantly</p>
                <li>Customer Support Lead</li>
            </section>
            <section>
                <img :src="Image" alt="Hero" />
                <h4>Amina O</h4>
                <p>Everything just feels smooth — from creating tickets to closing them. It keeps our workflow organized and our team on the same page.</p>
                <li>Product Designer</li>
            </section>
        </summary>
        <footer>
            <p>&copy; copyright 2025 Ticketly</p>
            <p>Privacy Policy</p>
            <p>Terms</p>
        </footer>
        <p>Code with Love and Peace by AbdulMalik</p>
    </div>
    
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import hero from '@/assets/hero.png'
    import Image from '@/assets/image.jpg'
    import { useRouter } from "vue-router";
    const router = useRouter();
</script>

<style scoped>
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    
    #landing{
        width: 100%;
        min-height: 100vh;
        background-color: #FFF;
        > header{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            > h2{
                letter-spacing: 2px;
                font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            }
            > nav{
                > button{
                    min-width: 120px;
                    min-height: 35px;
                    margin-left: 30px;
                    background-color: transparent;
                    color: #000;
                    border: none;
                    letter-spacing: 1px;
                    cursor: pointer;
                    font-weight: bold;
                    font-family: Arial, Helvetica, sans-serif;
                    transition: all 1s;
                    &:hover{
                        background-color: #2563EB;
                        color: #FFF;
                        border-radius: 5px;
                    }
                    + button{
                        background-color: #2563EB;
                        color: #FFF;
                        border-radius: 5px;
                        &:hover{
                            background-color: #FFF;
                            color: #2563EB;
                            border: 1px solid #000;
                        }
                    }
                }
            }
        }
        
        > main{
            width: 100%;
            min-height: 90vh;
            background-image: url("/background-desktop.png");
            background-position: center;
            background-size: cover;
            margin-top: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            > div{
                > h1{
                    color: #FFF;
                    padding-top: 30px;
                    margin-left: 20px;
                    font-size: 4rem;
                    width: 100%;
                    font-family: Verdana, Geneva, Tahoma, sans-serif;
                }
                > p{
                    color: #FFF;
                    margin-left: 35px;
                    font-size: 1.7rem;
                    margin-top: 30px;
                    font-family: 'Courier New', Courier, monospace;
                }
                > nav{
                    display: flex;
                    align-items: center;
                    gap: 30px;
                    margin-left: 40px;
                    margin-top: 80px;
                    > button{
                        min-width: 200px;
                        min-height: 50px;
                        border: none;
                        font-size: 1.2rem;
                        cursor: pointer;
                        border-radius: 6px;
                        background-color: #2563EB;
                        color: #FFF;
                        box-shadow: 0px 2px 8px #FFF;
                        &:hover{
                            background: linear-gradient(to left, #2563EB, #000);
                        }
                        + button{
                            background-color: #FFF;
                            color: #000;
                            box-shadow: 0px 2px 8px #000;
                        }
                    }
                }
            }
            > img{
                width: 45%;
            }
            
        }
        > h1{
            text-align: center;
            margin-top: 100px;
            font-size: 3rem;
            font-family: Verdana, Geneva, Tahoma, sans-serif;
        }
        > section{
            width: 100%;
            min-height: 50vh;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            margin-top: 100px;
            > article{
                width: 28%;
                min-height: 40vh;
                background-color: #F9FAFB;
                box-shadow: 0px 0px 10px #000;
                border-radius: 4px;
                transform: skew(3deg);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                text-align: center;
                padding-bottom: 20px;
                > i{
                    font-size: 5rem;
                    margin-bottom: 20px;
                    margin-top: 20px;
                }
                > h4{
                    font-family: Arial, Helvetica, sans-serif;
                    font-size: 2rem;
                }
                > p{
                    margin-top: 20px;
                    width: 95%;
                    font-size: 1.5rem;
                    font-family: 'Courier New', Courier, monospace;
                }
                + article{
                    transform: skew(-3deg);
                }
            }
        }

        > summary{
            width: 100%;
            margin-top: 150px;
            display: flex;
            justify-content: space-around;
            > section{
                width: 30%;
                min-height: 20vh;
                padding-bottom: 20px;
                background-color: #dfe1e1;
                display: flex;
                flex-direction: column;
                align-items: center;
                border-radius: 5px;
                > img{
                    width: 60px;
                    border-radius: 100px;
                    margin-top: -30px;
                    margin-bottom: 30px;
                }
                > h4{
                    font-size: 1.3rem;
                    font-family: Arial, Helvetica, sans-serif;
                }
                > p{
                    text-align: center;
                    width: 95%;
                    margin-top: 20px;
                    line-height: 25px;
                    font-family: 'Courier New', Courier, monospace;
                }
                > li{
                    list-style-type: none;
                    margin-top: 30px;
                    font-size: 13px;
                    font-family: Verdana, Geneva, Tahoma, sans-serif;
                }
            }
        }

        footer{
            margin-top: 100px;
            width: 100%;
            min-height: 30vh;
            background-color: #2563EB;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 40px;
            color: #FFF;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        > p{
            margin-top: 20px;
            text-align: center;
            color: #000;
            letter-spacing: 10px;
            word-spacing: 20px;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        }
    }

    @media screen and (max-width: 870px){
        #landing{
            > header{
                padding: 20px 10px;
                > nav{
                    > button{
                        min-width: 100px;
                        margin-left: 0px;
                    }
                }
            }
            > main{
                flex-direction: column;
                > div{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    > h1, > p{
                        margin-left: 0px;
                    }
                    > nav{
                        margin-left: 0px;
                        width: 100%;
                        flex-direction: column;
                        > button{
                            width: 70%;
                            margin-bottom: 20px;
                        }
                    }
                }
                > img{
                    margin-top: 100px;
                    width: 80%;
                }
            }

            > section{
                flex-direction: column;
                align-items: center;
                > article{
                    width: 90%;
                    margin-bottom: 70px;
                    transform: skew(1deg);
                    + article{
                    transform: skew(-1deg); 
                    }
                }
            }

            > summary{
                flex-direction: column;
                align-items: center;
                > section{
                    width: 90%;
                    margin-bottom: 80px;
                }
            }
            > footer{
                flex-direction: column;
            }
            > p{
                letter-spacing: 3px;
                word-spacing: 2px;
            }
        }
    }
</style>
