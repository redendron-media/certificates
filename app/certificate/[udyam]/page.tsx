export const dynamic = 'force-dynamic';
export const dynamicParams = true;

import React from 'react';
import { sanityClient } from '@/lib/sanity';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    udyam: string;
  }>;
}

const fetchCertificateData = async (udyam: string) => {
  const query = `
    *[_type == "certificates" && udyam == $udyam][0]{
      name,
      training,
      district,
      udyam,
      serial,
      days,
      institute,
      address,
     from,
      to
    }
  `;

  const certificate = await sanityClient.fetch(query, { udyam });

  if (!certificate) {
    console.warn("No certificate found for:", udyam);
  }

  return certificate;
};

const CertificatePage = async ({ params }: Props) => {
  const { udyam } = await params;
  const decoded = decodeURIComponent(udyam);
  const certificate = await fetchCertificateData(decoded);

  if (!certificate) return notFound();

  return (
    <main className="min-h-screen flex items-center justify-center bg-white py-12 px-6">
    <section className="bg-white w-full max-w-3xl border-4 border-black p-10 rounded-xl shadow-xl font-serif text-gray-900">
      <h1 className="text-4xl font-bold mb-2 text-center uppercase tracking-widest text-black">
        Certificate of Completion
      </h1>
  
      <p className="text-center text-lg italic mb-8 text-gray-800">
        This is proudly presented to
      </p>
  
      <h2 className="text-3xl font-bold text-center mb-2  text-black">
        {certificate.name}
      </h2>
  
      <p className="text-center text-lg mb-6 text-gray-900">
        from <span className="font-semibold">{certificate.district}</span>
      </p>
  
      <p className="text-center text-lg mb-4 text-gray-800">
        for successfully completing the training on
      </p>
  
      <h3 className="text-2xl text-center font-semibold mb-2 text-black">
        {certificate.training}
      </h3>
  
      <div className="text-center mb-6">
        <p className="text-lg font-semibold text-black">
          Duration: {certificate.days} Days
        </p>
        <p className="text-sm text-gray-800">
          From {certificate.from} to {certificate.to}
        </p>
      </div>
  
      <div className="text-center mb-6">
        <p className="text-sm text-gray-800">Conducted by:</p>
        <p className="font-medium text-black">{certificate.institute}</p>
        <p className="text-sm text-gray-800">{certificate.address}</p>
      </div>
  
      <div className="text-center text-sm text-gray-800 mb-4">
        <p>Udyam No: {certificate.udyam}</p>
        <p>Serial No: {certificate.serial}</p>
      </div>
    </section>
  </main>  
  );
};

export default CertificatePage;
