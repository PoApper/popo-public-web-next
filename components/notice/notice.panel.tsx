import { INotice } from '@/types/notice.interface';
import { useState } from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const NoticePanel = ({ noticeList }: { noticeList: INotice[] }) => {
  const [isLike, setIsLike] = useState<boolean[]>(
    new Array(noticeList.length).fill(false),
  );
  const handleLike = (id: number) => {
    setIsLike((prevIsLike) => {
      const newLike = [...prevIsLike];
      newLike[id] = !newLike[id];
      return newLike;
    });
  };
  const like_count = 3;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
      {noticeList.map((notice) => (
        <NoticeCard key={notice.id}>
          <div
            style={{ fontWeight: 700, fontSize: 18, textDecoration: 'none' }}
          >
            {notice.link ? (
              <a
                href={notice.link}
                target={'_blank'}
                rel={'noopener noreferrer'}
                style={{ color: 'black' }}
              >
                {notice.title} 🔗
              </a>
            ) : (
              notice.title
            )}
          </div>
          <div
            style={{ marginTop: 8, whiteSpace: 'pre-line', textAlign: 'left' }}
          >
            {notice.content}
          </div>
          {notice.image_url ? (
            <Image src={notice.image_url} alt={notice.title} />
          ) : null}
          <div className="like-button">
            <button
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              onClick={() => {
                handleLike(notice.id);
              }}
            >
              {isLike[notice.id] ? 'Unlike' : 'Like'}
            </button>
            {'Count ' +
              (isLike[notice.id] ? `${like_count + 1}` : `${like_count}`)}
          </div>
        </NoticeCard>
      ))}
    </div>
  );
};

export default NoticePanel;

const NoticeCard = styled.div`
  background: #eeeeee;
  border-radius: 0.4em;
  padding: 14px;
`;
