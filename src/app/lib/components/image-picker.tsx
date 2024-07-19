"use client"

import { useRef, useState } from "react"
import Image from "next/image";

interface ImagePickerProps {
    urlParameter?: string;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({ urlParameter }) => {
    const photo = useRef<HTMLInputElement>(null);

    const [url,setUrl] = useState<string>(urlParameter ?? "");

    const handleChange = () => {

        let file = photo.current?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);

            reader.onload = () => {
                setUrl(reader.result as string);
            }
        }

    }
    return <>
        <input
            type="file"
            className="input is-dark is-hidden"
            ref={photo}
            name="cover"
            onChange={handleChange}
            accept="image/*"
        />
        <button onClick={() => photo.current?.click()} type="button" className="button is-light">Pick</button>
        {
            url && <div className="box has-background-light">
                <Image
                src = {url}
                width = {150}
                height = {150}
                alt = "Course Photo"/>
            </div>
        }
    </>
}