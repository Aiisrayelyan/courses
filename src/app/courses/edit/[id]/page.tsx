import { handleAdd, handleUpdate } from "@/app/lib/actions/course-actions";
import { ImagePicker } from "@/app/lib/components/image-picker";
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
        redirect('/courses');
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    };
    
    return <>
        <h1 className="is-size-4">Edit Course</h1>
        <div className="columns">
            <div className="column is-two-fifths">
                <form className="box my-5" action = {handleUpdate}>
                    <input type="hidden" name="id" value={course.id}/>
                    <div className="field my-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="enter a name"
                            className="input is-dark"
                            defaultValue={course.name}
                        />
                    </div>
                    <div className="field my-4">
                        <input
                            type="text"
                            name="price"
                            placeholder="enter a price"
                            className="input is-dark"
                            defaultValue={course.price}
                        />
                    </div>
                    <div className="field my-4">
                        <input
                            type="text"
                            name="duration"
                            placeholder="enter a duration"
                            className="input is-dark"
                            defaultValue={course.duration}
                        />
                    </div>
                    <div className="field my-4">
                        <ImagePicker urlParameter={'/' + course.cover}/>
                    </div>
                    <div className="field my-4">
                        <button className="button is-danger">submit</button>
                    </div>
                </form>
            </div>
        </div>
    </>
}