import Image from 'next/image';

export default function LogoGreenBackground() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#2a3328',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Image
        src="/citadel-logo-official.png"
        alt="Citadel Gold"
        width={800}
        height={200}
        style={{ objectFit: 'contain', maxWidth: '80vw', height: 'auto' }}
        priority
      />
    </div>
  );
}
