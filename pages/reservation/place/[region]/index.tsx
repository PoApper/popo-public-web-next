import {useRouter} from "next/router";
import Layout from "../../../../components/layout";

type ObjectType = {
    [key: string]: string
}

const regionName: ObjectType = {
    "student-hall": "학생 회관",
    "jigok": "지곡 회관",
    "others": "생활관 외",
}

const regionOptions: ObjectType = {
    "student-hall": "STUDENT_HALL",
    "jigok": "JIGOK_CENTER",
    "others": "OTHERS",
}

const PlaceRegion: React.FunctionComponent = (props) => {
    const router = useRouter();
    const region = router.query.region as string;

    return (
        <Layout>
            <div>
                <h1>{regionName[region]} - 장소 예약하기</h1>
            </div>
        </Layout>
    )
}

export default PlaceRegion