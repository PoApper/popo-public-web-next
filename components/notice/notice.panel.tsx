import { INotice } from '@/types/notice.interface'
import { Image } from 'semantic-ui-react';
import styled from 'styled-components'

const NoticePanel = ({
   noticeList 
}: { noticeList: INotice[] }) => {
  return (
    <div style={{flex: 1}}>
      { 
        noticeList.map((notice) => 
        <HomeCard key={notice.id}>
          <div style={{fontWeight: 700, fontSize: 18}}>
            {
              notice.link ? (
                <a href={notice.link} target={'_blank'}>
                  {notice.title} 
                </a>
              ) : notice.title
            }
          </div>
          <div style={{marginTop: 8}}>
            {notice.content}
          </div>
          {
            notice.image_url ? (
              <Image src={notice.image_url}/>
            ) : null
          }
        </HomeCard>
      )
      }
    </div>
  )
}

export default NoticePanel;

const HomeCard = styled.div`
  background: #eeeeee;
  border-radius: 0.4em;
  flex: 1;
  padding: 14px;
`