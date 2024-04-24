import styled from 'styled-components';
import { ReactNode } from 'react';

const IconLink = ({
  children,
  link,
}: {
  children: ReactNode;
  link?: string;
}) => {
  if (!link || link === 'null') {
    return null;
  } else {
    return (
      <IconAnchor href={link} target={'_blank'}>
        {children}
      </IconAnchor>
    );
  }
};

export default IconLink;

const IconAnchor = styled.a`
  text-decoration: none;
  color: black;
  margin-right: 4px;
`;
