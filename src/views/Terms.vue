<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'

import HeaderBar      from '@/components/HeaderBar.vue'
import FooterBar      from '@/components/FooterBar.vue'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)

</script>

<template>

    <div class="flex flex-1 items-center justify-center py-12 px-4">
      <div :class="[isDark ? 'bg-gray-800' : 'bg-white', 'w-full max-w-7xl space-y-8 p-8 rounded-3xl shadow-2xl transition duration-500']">
        <h1 class="text-center text-2xl font-bold mb-6">Terms of Service</h1>
        <p class="mb-4">
          Welcome to our service! Please read these Terms and Conditions carefully before registering or using the platform. By accessing or using the service, you agree to be bound by these terms.
        </p>

        <h2 class="text-xl font-semibold mt-6 mb-2">1. Services Provided</h2>
        <p class="mb-4">
          We offer user registration, login, browsing, and basic interactive services. We reserve the right to change, suspend, or terminate any part of the service at any time without prior notice.
        </p>

        <h2 class="text-xl font-semibold mt-6 mb-2">2. User Information</h2>
        <p class="mb-4">
          You must provide accurate, truthful, and complete information during registration. If any information changes, please update it promptly. Providing false information may result in suspension or termination of your account.
        </p>

        <h2 class="text-xl font-semibold mt-6 mb-2">3. User Conduct</h2>
        <p class="mb-4">
          You agree not to engage in any unlawful or inappropriate behavior on the platform, including but not limited to:
        </p>
        <ul class="list-disc pl-6 mb-4">
          <li>Posting illegal or false content</li>
          <li>Impersonating others</li>
          <li>Disrupting platform operations</li>
          <li>Using the service for unauthorized commercial purposes</li>
        </ul>

        <h2 class="text-xl font-semibold mt-6 mb-2">4. Account and Security</h2>
        <p class="mb-4">
          You are responsible for maintaining the confidentiality of your account and password. You must not share or transfer your account. We are not liable for any loss caused by your failure to safeguard your credentials.
        </p>

        <h2 class="text-xl font-semibold mt-6 mb-2">5. Intellectual Property</h2>
        <p class="mb-4">
          All content on the platform, including text, images, and code, is protected by intellectual property laws. You may not copy, distribute, or use any content without permission.
        </p>

        <h2 class="text-xl font-semibold mt-6 mb-2">6. Limitation of Liability</h2>
        <p class="mb-4">
          We strive to provide secure and stable services, but we are not responsible for any damages caused by technical issues, third-party attacks, or force majeure events.
        </p>

        <h2 class="text-xl font-semibold mt-6 mb-2">7. Changes to the Terms</h2>
        <p class="mb-4">
          We reserve the right to modify these Terms at any time. Any changes will be posted on this page and become effective immediately. Continued use of the service constitutes acceptance of the revised Terms.
        </p>

        <h2 class="text-xl font-semibold mt-6 mb-2">8. Governing Law</h2>
        <p class="mb-4">
          These Terms shall be governed by and interpreted in accordance with the laws of the applicable jurisdiction. Disputes shall be submitted to the local courts for resolution.
        </p>

        <p class="mt-8 text-sm text-gray-500">Last updated: May 3, 2025</p>
      </div>
    </div>

</template>

<style scoped>

</style>