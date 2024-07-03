import { PoPoAxios } from '@/lib/axios.instance';
import { INotice } from '@/types/notice.interface';
import { IUser } from '@/types/user.interface';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Image } from 'semantic-ui-react';
import styled from 'styled-components';

const NoticePanel = ({ noticeList }: { noticeList: INotice[] }) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser | null>({
    name: '',
  });

  useEffect(() => {
    PoPoAxios.get('/auth/verifyToken', {
      withCredentials: true,
    })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const [likes, setLikes] = useState<number[]>(
    noticeList.map((notice) => notice.like_count),
  );
  const [isLike, setIsLike] = useState<boolean[]>(
    new Array(noticeList.length).fill(false),
  );

  useEffect(() => {
    const fetchLikeStatus = async () => {
      // fetch like status
      const statuses = await Promise.all(
        noticeList.map((notice) =>
          PoPoAxios.get(`/notice/${notice.id}/like`, { params: { user } }),
        ),
      );
      setIsLike(statuses.map((status) => status.data));
    };
    if (user) fetchLikeStatus();
  }, [noticeList, user]);

  const handleLike = async (id: number) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      router.push('/auth/login');
      return;
    }

    try {
      // TODO: Call API
      setIsLike((prevIsLike) => {
        const newLike = [...prevIsLike];
        newLike[id] = !newLike[id];
        return newLike;
      });
    } catch (err) {
      alert('좋아요에 실패했습니다.');
      console.log(err);
    }
  };
  const like_count = 3; // 임시로 3으로 설정

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
              {/* TODO: 아이콘 interactive하게 변경 */}
              {isLike[notice.id] ? 'Unlike' : 'Like'}
            </button>
            {/* TODO: likes로 변경 */}
            <span style={{ marginLeft: 8 }}>{like_count}</span>{' '}
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
