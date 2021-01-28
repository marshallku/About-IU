import "./Autograph.css";

export default function Autograph() {
    const loader = document.getElementById("loader");

    if (loader) {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 3200);
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="491.32"
            height="305.15"
            viewBox="0 0 491.32 305.15"
        >
            <path
                d="M.61,303.07S480.07,89.13,489.7,19.18c4.59-35-116-16-243.2,39.3C-79.13,200-31.51,374.07,187,274.07c0,0,101.83-37,91.16-43s-81.37,25.65-98.66,54.66C159.61,319.07,318.4,249.65,312,245.57s-36.5,19.58-35.25,20.33,36.66-.42,46.08-16.08-30.75,18.75-19.58,16.66a93.23,93.23,0,0,0,20.08-6.25"
                style={{
                    fill: "none",
                    stroke: "#fff",
                    strokeWidth: "3px",
                    strokeDasharray: "1878",
                }}
            />{" "}
        </svg>
    );
}
