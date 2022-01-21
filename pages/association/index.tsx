import Layout from '../../components/layout'
import { Grid, Image } from 'semantic-ui-react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const AssociationIndexPage = () => {
  const [introList, setIntroList] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/introduce/association`).
      then(res => setIntroList(res.data)).
      catch(() => alert('소개글을 불러오는데 실패했습니다.'))
  }, [])

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
                    <Image
                      centered size="small"
                      href={`/association/introduce/${_intro.name}`}
                      src={
                        _intro.logoName ?
                          `${process.env.NEXT_PUBLIC_API}/introduce/association/image/${_intro.logoName}`
                          : 'https://react.semantic-ui.com/images/wireframe/image.png'}
                      alt={`${_intro.name}_logo`}
                    />
                    <AssociationName>{_intro.name}</AssociationName>
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

export default AssociationIndexPage

const AssociationName = styled.h3`
  word-break: keep-all;
`