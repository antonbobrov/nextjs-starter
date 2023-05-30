import { Heading } from '@/components/Typography/Heading';
import { FC, PropsWithChildren, useRef, useState } from 'react';
import { ScrollView } from '@anton.bobrov/react-components';
import { IBlockProps } from './types';

export const Block: FC<PropsWithChildren<IBlockProps>> = ({
  title,
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const headingRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{ margin: '40px 0' }}>
      <ScrollView.Element animation="fadeInUp">
        <Heading
          ref={headingRef}
          variant={4}
          onClick={() => setIsVisible((val) => !val)}
          style={{ cursor: 'pointer', userSelect: 'none' }}
        >
          {title} {isVisible ? '-' : '+'}
        </Heading>
      </ScrollView.Element>

      {isVisible && (
        <>
          <hr />
          {children}
          <hr />
        </>
      )}
    </section>
  );
};
