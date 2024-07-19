import { redirect } from "next/navigation";
import { getCourseById } from "../../../lib/api";
import styles from "../../../page.module.css";

interface PageProps {
    params: {
        id: string;
    };
}

export default function Page({ params }: PageProps) {
    if (!params.id) {
        redirect('/');
    }
    
    const course = getCourseById(params.id);
    console.log(course);

    if(course === null || course.name === '') {
        return <h1>COURSE NOT FOUND</h1>
    }

    return <>
        <div className={styles.courses_div}>
            <div className={styles.courses_card} key={course.id}>
                <h2>{course.name}</h2>
                <h3>{'PRICE: ' + course.price}</h3>
                <h3>{'DURATION: ' + course.duration}</h3>
                <img src={'/' + course.cover}></img>
            </div>
        </div>
    </>
}
