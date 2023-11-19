import { useEffect } from "react";
import { useState } from "react";
import {dummyConcertImage} from "../data/concertDummy"

export default function LazyLoadImage({ src, alt,title, className }) {
    const [imageSrc, setImageSrc] = useState();

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            setImageSrc(src);
        };

    }, [src]);

    return <img className={className} src={(imageSrc || dummyConcertImage)} alt={alt} title={title} />;
}