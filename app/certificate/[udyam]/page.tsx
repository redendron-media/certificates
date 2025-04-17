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
      udyam,
      serial,
      noOfDays,
      trainingInstituteName,
      trainingInstituteAddress,
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
    <main className="min-h-screen px-6 py-12 bg-white text-black">
      <section className="max-w-2xl mx-auto border border-gray-300 p-10 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Certificate of Completion</h1>

        <p className="mb-4 text-lg">This certifies that:</p>
        <p className="text-2xl font-semibold mb-6">{certificate.name}</p>

        <p className="mb-4 text-lg">Has successfully completed:</p>
        <p className="text-xl mb-6">{certificate.training}</p>

        <p className="mb-2 text-sm text-gray-500">Udyam No: {certificate.udyam}</p>
        <p className="mb-2 text-sm text-gray-500">Serial No: {certificate.serial}</p>
        <p className="text-sm text-gray-500">Duration: {certificate.noOfDays} Days</p>
        <p className="text-sm text-gray-500">
          Conducted by: {certificate.trainingInstituteName}
        </p>
        <p className="text-sm text-gray-500">
          Address: {certificate.trainingInstituteAddress}
        </p>

        <div className="mt-10 border-t pt-4 text-sm text-gray-400 text-center">
          Issued on: {certificate.from} – {certificate.to}
        </div>
      </section>
    </main>
  );
};

export default CertificatePage;
