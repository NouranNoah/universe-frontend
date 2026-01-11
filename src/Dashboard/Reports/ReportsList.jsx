export default function ReportsList({ reports }) {
  return (
    <>
      {reports.map(report => (
        <ReportCard key={report.id} data={report} />
      ))}
    </>
  );
}
