import { Image } from '@/components/ui/Image';
import { Media as MediaComponent } from '@/components/ui/Media';
import { Heading } from '@/components/ui/Typography/Heading';
import { FC } from 'react';

export const Media: FC = () => (
  <div style={{ display: 'grid', gap: '2rem' }}>
    <div>
      <Heading variant={6} style={{ marginBottom: '1.5rem' }}>
        Lazy image
      </Heading>

      {/* <div style={{ position: 'relative', width: 300, height: 300 }}> */}
      <Image
        style={{ width: 300, height: 'auto' }}
        src="/mock/photo.jpg"
        width={1920}
        height={1080}
        alt="Photo"
        sizes="100vw"
      />

      {/* </div> */}
    </div>

    <div>
      <Heading variant={6} style={{ marginBottom: '1.5rem' }}>
        Media With Image
      </Heading>

      <div style={{ position: 'relative', width: 300, height: 168 }}>
        <MediaComponent
          image={{
            src: '/mock/photo.jpg',
            width: 1920,
            height: 1080,
            alt: 'Photo',
          }}
          sizes="100vw"
        />
      </div>
    </div>

    <div>
      <Heading variant={6} style={{ marginBottom: '1.5rem' }}>
        Media With Video
      </Heading>

      <div style={{ position: 'relative', width: 300, height: 168 }}>
        <MediaComponent video="/mock/video.mp4" sizes="100vw" />
      </div>
    </div>

    <div>
      <Heading variant={6} style={{ marginBottom: '1.5rem' }}>
        Media With Image + Video
      </Heading>

      <div style={{ position: 'relative', width: 300, height: 168 }}>
        <MediaComponent
          image={{
            src: '/mock/photo.jpg',
            width: 1920,
            height: 1080,
            alt: 'Photo',
          }}
          video="/mock/video.mp4"
          sizes="100vw"
        />
      </div>
    </div>
  </div>
);
