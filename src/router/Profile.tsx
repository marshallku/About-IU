import "./Profile.css";

export default function Profile() {
    return (
        <section id="profile">
            <picture id="profileBG">
                <img
                    src="https://lh3.googleusercontent.com/pw/ACtC-3epfdC_7rd_uL5Yni0lJYyHwJWMQrECiDI3ZOwGZQNtkf9zEzMFIQuQWt3hvVxPRXk0YeLZpp3X0o2zU2EaxPhb-glVdEvGJKHEmAQ9MNfI5i03BD4gQd0ceOn1tzPj_t1JxYaiILVu6r4pOu-CsqDZ=w1920"
                    srcSet="https://lh3.googleusercontent.com/pw/ACtC-3epfdC_7rd_uL5Yni0lJYyHwJWMQrECiDI3ZOwGZQNtkf9zEzMFIQuQWt3hvVxPRXk0YeLZpp3X0o2zU2EaxPhb-glVdEvGJKHEmAQ9MNfI5i03BD4gQd0ceOn1tzPj_t1JxYaiILVu6r4pOu-CsqDZ=w1920 1920w, https://lh3.googleusercontent.com/pw/ACtC-3epfdC_7rd_uL5Yni0lJYyHwJWMQrECiDI3ZOwGZQNtkf9zEzMFIQuQWt3hvVxPRXk0YeLZpp3X0o2zU2EaxPhb-glVdEvGJKHEmAQ9MNfI5i03BD4gQd0ceOn1tzPj_t1JxYaiILVu6r4pOu-CsqDZ=w600 600w, https://lh3.googleusercontent.com/pw/ACtC-3epfdC_7rd_uL5Yni0lJYyHwJWMQrECiDI3ZOwGZQNtkf9zEzMFIQuQWt3hvVxPRXk0YeLZpp3X0o2zU2EaxPhb-glVdEvGJKHEmAQ9MNfI5i03BD4gQd0ceOn1tzPj_t1JxYaiILVu6r4pOu-CsqDZ=w400 400w, https://lh3.googleusercontent.com/pw/ACtC-3epfdC_7rd_uL5Yni0lJYyHwJWMQrECiDI3ZOwGZQNtkf9zEzMFIQuQWt3hvVxPRXk0YeLZpp3X0o2zU2EaxPhb-glVdEvGJKHEmAQ9MNfI5i03BD4gQd0ceOn1tzPj_t1JxYaiILVu6r4pOu-CsqDZ=w1536 1536w, https://lh3.googleusercontent.com/pw/ACtC-3epfdC_7rd_uL5Yni0lJYyHwJWMQrECiDI3ZOwGZQNtkf9zEzMFIQuQWt3hvVxPRXk0YeLZpp3X0o2zU2EaxPhb-glVdEvGJKHEmAQ9MNfI5i03BD4gQd0ceOn1tzPj_t1JxYaiILVu6r4pOu-CsqDZ=w2048 2048w"
                    sizes="(max-width: 1920px) 100vw, 1920px"
                    alt="IU Celebrity"
                />
            </picture>
            <div className="mainInfo">
                <h1>아이유 / IU</h1>
                <h2>이지은</h2>
                <div>생년월일 : 1993.05.16</div>
            </div>
        </section>
    );
}
