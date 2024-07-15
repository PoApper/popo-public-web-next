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
    uuid: '',
  });

  useEffect(() => {
    PoPoAxios.get('/auth/verifyToken', {
      withCredentials: false,
    })
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const [isLike, setIsLike] = useState<boolean[]>(
    new Array(noticeList.length).fill(false),
  );

  const [likes, setLikes] = useState<number[]>(
    new Array(noticeList.length).fill(0),
  );

  useEffect(() => {
    const fetchLikeStatus = async () => {
      if (!user) return;

      const statuses = await Promise.all(
        noticeList.map((notice) =>
          PoPoAxios.get(`/like/status`, {
            params: { user: user.uuid, notice: notice.id }, // user가 없을 시 status는 false
          }),
        ),
      );
      setIsLike(statuses.map((status) => status.data));
    };

    const fetchLikeCount = async () => {
      const counts = await Promise.all(
        noticeList.map((notice) =>
          PoPoAxios.get(`/like/count`, { params: { notice: notice.id } }),
        ),
      );
      setLikes(counts.map((count) => count.data));
    };
    if (user) {
      fetchLikeStatus();
      fetchLikeCount();
    }
  }, [noticeList, user]);

  const handleLike = async (id: number) => {
    if (!user) {
      alert('로그인이 필요합니다.');
      router.push('/auth/login');
      return;
    }

    try {
      if (isLike[id]) {
        await PoPoAxios.delete(`/like`, {
          params: { user: user.uuid, notice: noticeList[id] },
        });
        setLikes((prevLikes) => {
          const newLikes = [...prevLikes];
          newLikes[id] -= 1;
          return newLikes;
        });
      } else {
        await PoPoAxios.post(`/like`, {
          params: { user: user.uuid, notice: noticeList[id] },
        });
        setLikes((prevLikes) => {
          const newLikes = [...prevLikes];
          newLikes[id] += 1;
          return newLikes;
        });
      }

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
              {isLike[notice.id] ? (
                <span style={{ fontSize: '24px', color: 'red' }}>&#x2665;</span>
              ) : (
                <span style={{ fontSize: '24px', color: 'gray' }}>
                  &#x2661;
                </span>
              )}
            </button>
            <span style={{ marginLeft: 8 }}>{likes[notice.id]}</span>{' '}
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
