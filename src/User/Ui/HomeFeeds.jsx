import React, { useEffect, useState, Suspense, lazy, useRef } from 'react';
import FeedHeadings from '../component/FeedHeadings';
import { fetchPosts } from '../auth/authUser';
import { Skeleton, Spin } from 'antd';

const LazyFeedCard = lazy(() => import('./FeedCard'));

const HomeFeeds = ({ userId }) => {
  const headings = ['Recent', 'Friends', 'Popular'];
  const [value, setValue] = useState('Recent');
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [shouldFetchMore, setShouldFetchMore] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more posts are available
  const observerRef = useRef(null);

  // Fetch posts whenever the value or shouldFetchMore changes
  useEffect(() => {
    if (!shouldFetchMore || !hasMore) return;

    const fetchPostsFn = async () => {
      setLoading(true);
      try {
        const response = await fetchPosts(value, offset, userId);
        if (response.data.length > 0) {
          setPosts((prev) => [...prev, ...response.data]);
          setOffset((prevOffset) => prevOffset + 5);
        } else {
          setHasMore(false); // No more posts to fetch
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
        setShouldFetchMore(false); // Reset flag after fetching
      }
    };

    fetchPostsFn();
  }, [value, shouldFetchMore, offset, hasMore, userId]);

  // Set up Intersection Observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setShouldFetchMore(true);
        }
      },
      { threshold: 0.5 } // Adjust this value if needed
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore]); // Include hasMore in the dependencies

  // Handle category change
  const handleChangeCategory = (newValue) => {
    setValue(newValue);
    setOffset(0); // Reset offset when changing category
    setPosts([]); // Clear posts when changing category
    setHasMore(true); // Reset hasMore state for new category
    setShouldFetchMore(true); // Ensure new category fetches posts
  };

  return (
    <div className='lg:col-span-5 h-[88vh] col-span-1 flex flex-col gap-4 rounded-3xl px-2 md:px-10'>
      <FeedHeadings headings={headings} setValue={handleChangeCategory} />
      <div className='h-fit overflow-y-auto no-scrollbar max-h-[88vh] grid grid-cols-1 gap-5'>
        {posts.map((post, index) => (
          <Suspense
            key={index}
            fallback={<Skeleton active paragraph={false} title={true} />}
          >
            <LazyFeedCard post={post} />
          </Suspense>
        ))}
        {loading && (
          <div className='flex justify-center items-center'>
            <Spin />
          </div>
        )}
        <div ref={observerRef} className='min-h-28' />
      </div>
    </div>
  );
};

export default HomeFeeds;
