// SkeletonLoader.js
import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonLoader = () => (
  <ContentLoader
    speed={2}
    width={200}
    height={200}
    viewBox="0 0 200 150"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="3" ry="3" width="100%" height="100" />
  </ContentLoader>
);

export default SkeletonLoader;
