import "./Profile.css";

export default function Profile() {
    return (
        <section id="profile">
            <picture id="profileBG">
                <img
                    src="https://lh3.googleusercontent.com/pw/ACtC-3dOzFVbvP1FzkNPjGqwYZp3GUXJkpQ1_ceW6QQza0O-T-I618M95Il5WewStBJ3qzSd4ZS0e4ozXNq9cBH7DE1-I9DsVMYXuOBpZ4Ay9rZPcaH-pC7ZcIjYaeTmn284tIgeR-U8coqYr4Wv_khraxP7=w1920"
                    srcSet="https://lh3.googleusercontent.com/pw/ACtC-3dOzFVbvP1FzkNPjGqwYZp3GUXJkpQ1_ceW6QQza0O-T-I618M95Il5WewStBJ3qzSd4ZS0e4ozXNq9cBH7DE1-I9DsVMYXuOBpZ4Ay9rZPcaH-pC7ZcIjYaeTmn284tIgeR-U8coqYr4Wv_khraxP7=w1920 1920w, https://lh3.googleusercontent.com/pw/ACtC-3dOzFVbvP1FzkNPjGqwYZp3GUXJkpQ1_ceW6QQza0O-T-I618M95Il5WewStBJ3qzSd4ZS0e4ozXNq9cBH7DE1-I9DsVMYXuOBpZ4Ay9rZPcaH-pC7ZcIjYaeTmn284tIgeR-U8coqYr4Wv_khraxP7=w600 600w, https://lh3.googleusercontent.com/pw/ACtC-3dOzFVbvP1FzkNPjGqwYZp3GUXJkpQ1_ceW6QQza0O-T-I618M95Il5WewStBJ3qzSd4ZS0e4ozXNq9cBH7DE1-I9DsVMYXuOBpZ4Ay9rZPcaH-pC7ZcIjYaeTmn284tIgeR-U8coqYr4Wv_khraxP7=w400 400w, https://lh3.googleusercontent.com/pw/ACtC-3dOzFVbvP1FzkNPjGqwYZp3GUXJkpQ1_ceW6QQza0O-T-I618M95Il5WewStBJ3qzSd4ZS0e4ozXNq9cBH7DE1-I9DsVMYXuOBpZ4Ay9rZPcaH-pC7ZcIjYaeTmn284tIgeR-U8coqYr4Wv_khraxP7=w1536 1536w, https://lh3.googleusercontent.com/pw/ACtC-3dOzFVbvP1FzkNPjGqwYZp3GUXJkpQ1_ceW6QQza0O-T-I618M95Il5WewStBJ3qzSd4ZS0e4ozXNq9cBH7DE1-I9DsVMYXuOBpZ4Ay9rZPcaH-pC7ZcIjYaeTmn284tIgeR-U8coqYr4Wv_khraxP7=w2048 2048w"
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
