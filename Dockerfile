# Base stage for dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Install dependencies needed for build
RUN apk add --no-cache libc6-compat

# Copy package manager files and install dependencies
COPY package.json package-lock.json ./
RUN npm ci --fetch-timeout=600000

# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
# Copy all other project files
COPY . .

# Set build-time environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Set correct ownership for the entire app directory
RUN chown -R nextjs:nodejs /app

# Copy necessary files from the builder stage with correct ownership
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Set runtime environment
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"
ENV NODE_OPTIONS="--max-old-space-size=4096"

# Switch to non-root user
USER nextjs

EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
