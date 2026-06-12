import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout'
import Dashboard from '@/pages/Dashboard'
import PatientsList from '@/pages/PatientsList'
import PatientDetail from '@/pages/PatientDetail'
import PatientEdit from '@/pages/PatientEdit'
import CaseTaking from '@/pages/CaseTaking'
import CaseFlow from '@/pages/CaseFlow'
import CaseSheet from '@/pages/CaseSheet'
import ScalesList from '@/pages/ScalesList'
import ScaleAssessment from '@/pages/ScaleAssessment'
import ScaleResults from '@/pages/ScaleResults'
import Schedule from '@/pages/Schedule'
import AppointmentForm from '@/pages/AppointmentForm'
import Guidelines from '@/pages/Guidelines'
import GuidelineDetail from '@/pages/GuidelineDetail'
import DrugSafety from '@/pages/DrugSafety'
import AuditLog from '@/pages/AuditLog'
import Settings from '@/pages/Settings'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/patients" element={<PatientsList />} />
        <Route path="/patients/:id" element={<PatientDetail />} />
        <Route path="/patients/:id/edit" element={<PatientEdit />} />
        <Route path="/cases" element={<CaseTaking />} />
        <Route path="/cases/new/:template" element={<CaseFlow />} />
        <Route path="/cases/:id" element={<CaseSheet />} />
        <Route path="/scales" element={<ScalesList />} />
        <Route path="/scales/:scaleId/:patientId" element={<ScaleAssessment />} />
        <Route path="/scales/:scaleId/:patientId/results" element={<ScaleResults />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/schedule/appointment/:id?" element={<AppointmentForm />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/guidelines/:id" element={<GuidelineDetail />} />
        <Route path="/drugs" element={<DrugSafety />} />
        <Route path="/audit" element={<AuditLog />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}
