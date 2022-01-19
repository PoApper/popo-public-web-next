import Layout from '../../../components/layout'
import { Container, Grid, Image } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const ClubSingIntroducePage = () => {
  const router = useRouter()
  const { clubType } = router.query
  const [introList, setIntroList] = useState([])

  console.log(clubType)

  useEffect(() => {
    if (!clubType) return;
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/introduce/club/clubType/${clubType}`).
      then(res => setIntroList(res.data)).
      catch(() => alert('소개글을 불러오는데 실패했습니다.'))
  }, [clubType])


  /**
   * A function for generate grid
   */
  function generateGrid (num_col: number) {
    // grid를 생성할 때, `num_col`의 배수로 맞춰주려고 일부러 `null`을 삽입함.
    for (let i = 0; i < introList.length % num_col; i++) {
      // @ts-ignore
      introList.push(null)
    }

    // 1차원 배열 `this.state.intros`를 2차원 배열 `intros`로 변환
    let newIntroList = []
    for (let i = 0; i < introList.length; i += num_col) {
      newIntroList.push(introList.slice(i, i + num_col))
    }

    return newIntroList.map((inner_intros, idx) => {
      return (
        <Grid.Row columns={4} key={idx}>
          {inner_intros.map((_intro: any, idx) => {
            if (_intro) {
              return (
                <Grid.Column key={idx}>
                  <div>
                    <Container style={{width: "12em", lineHeight: "12em"}}>
                      <Image
                        centered size="small"
                        href={`/club/introduce/${_intro.name}`}
                        src={
                          _intro.logoName ?
                            `${process.env.NEXT_PUBLIC_API}/introduce/club/image/${_intro.logoName}`
                            : 'https://react.semantic-ui.com/images/wireframe/image.png'}
                        alt={`${_intro.name}_logo`}
                      />
                    </Container>
                    <h4 style={{margin: "5px 0 0"}}>{_intro.name}</h4>
                    <p style={{color: 'gray'}}>{_intro.short_desc}</p>
                  </div>
                </Grid.Column>
              )
            } else {
              return (
                <Grid.Column key={idx}>
                  {null}
                </Grid.Column>
              )
            }
          })}
        </Grid.Row>
      )
    })
  }

  return (
    <Layout>
      <Grid textAlign="center" stackable>
        {generateGrid(4)}
      </Grid>
    </Layout>
  )

}

export default ClubSingIntroducePage
